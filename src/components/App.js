import PetBrowser from './PetBrowser'
 export default class App extends React.Component {
   constructor() {
    super()
    super();
     this.state = {
      pets: [],
    }
  }
  fetchPets = () => {
    let url = '/api/pets';
     if(this.state.filters.type !== 'all'){
      url += `?type=${this.state.filters.type}`;
    }
    fetch(url).then(response => response.json()).then(pets => this.setState({pets}));
   };
   onChangeType = ({ target: { value } }) => {
      this.setState({ filters: { ...this.state.filters, type: value } });
    };
    onAdoptPet = petId => {
        const pets = this.state.pets.map(p => {
          return p.id === petId ? { ...p, isAdopted: true } : p;
        });
        this.setState({ pets });
      };
   render() {
    return (
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters />
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.fetchPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser />
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
