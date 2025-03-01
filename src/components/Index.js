import React from 'react'
import HogTile from './HogTile'
import Button from './Button'

class Index extends React.Component {
  state = {
    filter: false,
    sortByWeight: false,
    hiddenPigs: []
  }

  pigsToShow = () => {
    return this.props.hogs.filter(pig => !this.state.hiddenPigs.includes(pig.name))
  }

  filteredHogs = () => {
    return this.state.filter ? this.pigsToShow().filter(hog => hog.greased) : this.pigsToShow()
  }

  sortedHogs = () => {
    if (this.state.sortByWeight) {
      return this.filteredHogs().sort((a,b) => a['weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water'] - b['weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water'])
    } else {
      return this.filteredHogs().sort((a,b)=> a.name < b.name ? -1 : (a.name > b.name ? 1 : 0))
    }
  }

  toggleFilter = () => {
    this.setState({filter: !this.state.filter})
  }

  toggleSort = () => {
    this.setState({sortByWeight: !this.state.sortByWeight})
  }

  clearHiddenPigs = () => {
    this.setState({hiddenPigs: []})
  }

  addHiddenPig = (pig) => {
    this.setState({hiddenPigs: [...this.state.hiddenPigs, pig.name]})
  }

  render() {
    return (
      <div>
        <Button handleClick={this.toggleFilter} text={`FILTER FOR GREASE: ${this.state.filter ? 'ON' : 'OFF'}`} />
        <Button handleClick={this.toggleSort} text={`Sort by ${this.state.sortByWeight ? 'Name' : 'Weight'}`} />
        {this.state.hiddenPigs.length === 0 ? '' : <Button handleClick={this.clearHiddenPigs} text={'Show All Pigs'}/>}
        <br /><br />
        <div className="ui grid container">
            {this.sortedHogs().map(hog => <HogTile hog={hog} key={hog.name} addHiddenPig={() => this.addHiddenPig(hog)}/>)}
        </div>
      </div>
    )
  }
}

export default Index