import React from 'react';
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormGroup from "react-bootstrap/lib/FormGroup";
import FormControl from "react-bootstrap/lib/FormControl";
import Col from "react-bootstrap/lib/Col";

import {FormattedMessage} from 'react-intl';
import {API_URL_PREFIX, fetch_get, fetchOperators} from "../utils";
import queryString from "query-string";
import update from "immutability-helper/index";
import PropTypes from 'prop-types';


export const StaticControl = ({label, value, validationState}) => (
    <FormGroup validationState={validationState}>
        <Col componentClass={ControlLabel} sm={2}>
            {label}
        </Col>

        <Col sm={9}>
            <FormControl.Static>
                {value}
            </FormControl.Static>
        </Col>
    </FormGroup>
);


export class Search extends React.Component {
    static defaultProps = {
        searchUrl: '',
        auth_token: undefined,
        location: {},
        user_info: {},
        collectionName: '',
        defaultCriteria: [],
        defaultSortingSpec: [],
        handleOperators: false,
        useNotifications: true,
    };

    static propTypes = {
        searchUrl: PropTypes.string.isRequired,
        auth_token: PropTypes.string.isRequired,
        location: PropTypes.shape({
            search: PropTypes.string
        }),
        collectionName: PropTypes.string.isRequired,
        defaultCriteria: PropTypes.array.isRequired,
        defaultSortingSpec: PropTypes.array.isRequired,
        handleOperators: PropTypes.bool.isRequired,
        useNotifications: PropTypes.bool.isRequired,
    };

    static criteriaFromParams(url_params, default_params) {
        const params = queryString.parse(url_params);
        let custom_params = {};
        if (params.filter !== undefined) {
            try {
                custom_params = JSON.parse(params.filter);
            } catch (e) { console.error(e) }
        }
        return update(
            default_params || {},
            {$merge: custom_params}
        );
    }

    constructor(props) {
        super(props);
        this.cancelLoad = false;
        this.state = {
            filter_criteria:
                Search.criteriaFromParams(
                    this.props.location.search,
                    this.props.defaultCriteria,
                ),
            paging_info: {
                page_number: 1, page_size: 50
            },
            sorting_spec : this.props.defaultSortingSpec,

            resources: undefined, operators: [],
            pagination: {
                page_number: 1,
                num_pages: 1,
            },
            error: undefined,
        };
        this._usableCriteria = this._usableCriteria.bind(this);
        this._filterCriteriaAsSpec = this._filterCriteriaAsSpec.bind(this);
        this._refresh = this._refresh.bind(this);
        this._refreshOperators = this._refreshOperators.bind(this);
        this._normalizeResource = this._normalizeResource.bind(this);
    }

    componentDidMount() {
        this._refresh();
        this.props.handleOperators && this._refreshOperators();
    }

    componentWillUnmount() {
        this.cancelLoad = true;
    }

    _refreshOperators() {
        fetchOperators(
            this.props.auth_token,
            data => !this.cancelLoad && this.setState({operators: data}),
            console.log
        );
    }

    _usableCriteria(c) {
        return (
            (c.value && c.op) || (c.op === 'is_null')
        );
    }

    _filterCriteriaAsSpec(filter_criteria) {
        return Object.keys(filter_criteria)
            .filter(f => this._usableCriteria(filter_criteria[f]))
            .map(f => (
                {field: f, op: filter_criteria[f].op, value: filter_criteria[f].value}
                )
            );
    }

    _normalizeResource(e) {
        return e;
    }

    _refresh(p, s) {
        const {filter_criteria, paging_info} = this.state;
        const {searchUrl, auth_token, collectionName} = this.props;
        const url = new URL(API_URL_PREFIX + searchUrl);
        // filter
        const filter_spec = this._filterCriteriaAsSpec(filter_criteria);
        url.searchParams.append('filter', JSON.stringify(filter_spec));
        // paging
        const paging_spec = p === undefined ? paging_info : update(paging_info, {$merge: p});
        url.searchParams.append('paging', JSON.stringify(paging_spec));
        //sorting
        const sorting_spec = s === undefined ? this.state.sorting_spec : [s];
        url.searchParams.append('sorting', JSON.stringify(sorting_spec));
        //reset collection
        this.setState({resources: undefined});

        fetch_get(url, auth_token)
            .then(data => !this.cancelLoad && this.setState({
                    resources: data[collectionName].map(this._normalizeResource),
                    pagination: {
                        page_number: data.pagination[0], // page_number, page_size, num_pages, total_results
                        page_size: data.pagination[1],
                        num_pages: data.pagination[2],
                        total_results: data.pagination[3],
                    },
                    sorting_spec: data.sorting || [],
            }))
            .catch(error => {
                if(this.cancelLoad) return;

                if(this.props.useNotifications) {
                    this.props.notifications && this.props.notifications.addNotification({
                        title: <FormattedMessage id="failed-search" defaultMessage="Search query failed!"/>,
                        message: error.message,
                        level: 'error'
                    })
                } else {
                    this.setState({error: error})
                }
            });
    }
}