import classNames from 'classnames';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';


function MentorFilters({filter}) {
  return (
    <ul className="task-filters">
      <li><Link className={classNames({active: !filter})} to="/">View All</Link></li>
      <li><Link activeClassName="active" to={{pathname: '/', query: {filter: 'completed'}}}>Favorites</Link></li>
    </ul>
  );
}

MentorFilters.propTypes = {
  filter: PropTypes.string
};

export default MentorFilters;
