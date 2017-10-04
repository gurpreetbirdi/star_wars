import React from 'react';
import { connect } from 'react-redux';
import {getFontSize} from '../../utils';
import {showPopup} from '../../actions';
import './index.css';

const Planet = ({ planet, maxPopulation, dispatch }) => (
	<div className="planet-box"
		style={{fontSize: getFontSize(planet.population, maxPopulation)}}
		onClick={()=>dispatch(showPopup(planet))}
	>
		<div><label>Planet Name : </label><label>{planet.name}</label></div>
		<div><label>Population  : </label><label>{planet.population}</label></div>
  	</div>
)

export default connect()(Planet);
