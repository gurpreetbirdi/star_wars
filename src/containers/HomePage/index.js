import React from 'react';
import Loader from 'react-loader';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SearchBox from '../../components/SearchBox';
import PlanetComponent from '../../components/PlanetComponent';
import DetailsPopup from '../../components/DetailsPopup';
import { updateText, throttledSearch, logOut } from '../../actions';
import { NotificationManager } from 'react-notifications';
import { loaderOptions } from '../../constants';

import './index.css';

const HomePage = ({dispatch, user, filteredPlanets, searchCount, maxPopulation, txtValue, isFetching, slectedPlanet}) => (
  <div className="home-page">
  	<div className="align-right">
		<input type="submit"
			className="btn-blue" value="Logout"
			onClick={()=>dispatch(logOut())}
		/>
  	</div>
  	<div className="home-page-wrapper">
			<SearchBox searchFun={e => {
					if (searchCount > 20 && user!== "luke skywalker") {
						e.preventDefault();
						NotificationManager.warning(
						  'Only Luke Skywalker can make more than 20 Searches.', 'Access Error', 2000
						);
					} else {
						dispatch(updateText(e.target.value))
				  	throttledSearch(e.target.value, dispatch);
					}
		  	}}
		  	txtValue={txtValue}
			/>
			{filteredPlanets.map(planet=><PlanetComponent key={planet.name} planet={planet} maxPopulation={maxPopulation}/>)}
			{searchCount!==0 && filteredPlanets.length===0 ? <div>No Planets Found</div> : null}
		</div>
    <DetailsPopup slectedPlanet={slectedPlanet} />
    <Loader loaded={!isFetching} options={loaderOptions} className="spinner" />
  </div>
)

const mapStateToProps = state => {
  const { user, filteredPlanets, txtValue, searchCount, maxPopulation, isFetching, slectedPlanet } = state;
  return {
  	user,
    filteredPlanets,
    txtValue,
    searchCount,
    maxPopulation,
    isFetching,
    slectedPlanet
  }
}
export default withRouter(connect(mapStateToProps)(HomePage))
