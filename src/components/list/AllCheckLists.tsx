import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './all-checklists.css';
import { ChecklistModel, StateModel } from '../../interfaces';

type ListModel = {list: ChecklistModel[]};

export const AllCheckLists = ({list}: ListModel) => (
    <div className="all-checklists">
        <h1>All checklists</h1>
        <ul className="list-group">
            {list.map((checklist: ChecklistModel) => {
                return (<li className="list-group-item" key={checklist.id}>
                    <Link
                        className="all-checklists-link"
                        to={`/checklist/${checklist.id}`}
                    >{checklist.title}
                    </Link>
                </li>);
            })}
        </ul>
    </div>
);

function mapStateToProps(state: StateModel): ListModel {
    let list = state.checklists;
    return {list};
}

export default connect(mapStateToProps)(AllCheckLists);