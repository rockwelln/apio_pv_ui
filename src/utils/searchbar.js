import React, { Component } from 'react';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Navbar from 'react-bootstrap/lib/Navbar';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import Popover from 'react-bootstrap/lib/Popover';
import Overlay from 'react-bootstrap/lib/Overlay';

import {Link} from 'react-router-dom';

import {FormattedMessage} from 'react-intl';

import {API_URL_PREFIX, fetch_get} from "../utils";
import {getIcon} from "../orange/requests";
import {ApioDatatable} from "./datatable";
import queryString from "query-string";
import Alert from "react-bootstrap/lib/Alert";


const SEARCHABLE = [
    [
        'requests',
            <span>
                <Glyphicon glyph="send"/>
            </span>
    ],
];

export class SearchBar extends Component {
    constructor(props, context) {
      super(props, context);
  
      this.state = {
        show: false,
        target: 'requests',
      };
      this.onSearch = this.onSearch.bind(this);
      this.onSearchRequests = this.onSearchRequests.bind(this);
    }

    onSearch(e) {
        const {target} = this.state;
        e.preventDefault();
        this.setState({show: true});
        
        switch(target) {
            case 'requests':
                this.onSearchRequests(this.searchbox.value);
                break;
            default: break;
        }
    }

    onSearchRequests(value) {
        const url = new URL(API_URL_PREFIX + '/api/v01/orange/requests/search');
        value = value.trim();
        var filter;
        
        if(isNaN(value)) {
            // not a number -> search for a CRDC ID
            filter = JSON.stringify({
                    model: 'requests',
                    field: 'id',
                    op: 'eq',
                    value: value
            });
            this.setState({filter: {request_id: {model: 'requests', value: value, op: 'eq'}}});
        } else {
            // otherwise ...
        }

        url.searchParams.append('filter', filter);

        url.searchParams.append(
            'sorting',
            JSON.stringify([{
                model: 'request', field: 'created_on', direction: 'desc'
            }])
        );
        this.setState({error: undefined, entries: undefined, searching: true});
        fetch_get(url, this.props.auth_token)
            .then(data => {
                let result = <ApioDatatable
                    headers={[
                        {title: '', render: n => getIcon(n.nprequest.kind), style: {width: '30px'}},
                        {title: '#', field: 'crdc_id',
                            render: n => <Link to={"/transactions/" + n.id}>{n.nprequest.crdc_id}</Link>
                        },
                        {title: <FormattedMessage id="status" defaultMessage="Status" />,
                            field: 'status',
                            render: n => n.nprequest.status,
                        },
                        {title: <FormattedMessage id="created-on" defaultMessage="Created on" />, field: 'created_on'},
                    ]}
                    data={data.requests}
                    />;
                this.setState(
                    {
                        searching: false,
                        entries: result
                    }
                );
            })
            .catch(error => this.setState({searching: false, error: error}))
    }

    render() {
        
        return (
            <Navbar.Form pullRight onBlur={() => this.setState({show: false})}>
                <Form onSubmit={this.onSearch}>
                    <FormGroup>
                        <InputGroup>
                            <DropdownButton
                                id='dropdown-searchbar-targets'
                                componentClass={InputGroup.Button}
                                onChange={e => this.setState({'target': e.target.value})}
                                title={SEARCHABLE.find(r => this.state.target === r[0])[1]}
                            >
                                {
                                    SEARCHABLE.map(r => 
                                        <MenuItem key={r[0]}>{r[1]}</MenuItem>
                                    )
                                }
                            </DropdownButton>
                            <FormControl type="text" placeholder="quick search..." inputRef={e => this.searchbox = e}/>
                            <InputGroup.Button>
                                <Button type="submit" onClick={this.onSearch}><Glyphicon glyph="search" /></Button>
                            </InputGroup.Button>
                        </InputGroup>
                    </FormGroup>
                </Form>
                <Overlay
                    show={this.state.show}
                    target={this.searchbox}
                    placement="bottom"
                    >
                    <Popover style={{width: '450px'}} id='popover-searchbar-results'>
                    {
                            this.state.searching ?
                                <i className="fa fa-spinner fa-spin"/>
                            : this.state.error ?
                                <Alert bsStyle="danger">
                                    <Glyphicon glyph="remove-circle"/>{' '}
                                    <FormattedMessage id='search-error' defaultMessage='Search fail'/>
                                </Alert>
                            :
                                this.state.entries || <span>... </span>
                        }
                        {
                            <Link
                                to={{
                                    pathname: "/transactions/list",
                                    search: queryString.stringify({
                                        filter: JSON.stringify(this.state.filter)
                                    })
                                }}>
                                <FormattedMessage id='see-all' defaultMessage='See all'/>
                            </Link>
                        }
                    </Popover>
                </Overlay>
            </Navbar.Form>
      );
    }
}
