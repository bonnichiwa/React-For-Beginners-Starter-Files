import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';
import fishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    componentDidMount() {
        this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    };

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish = (fish) => {
        // 1. Take a copy of the existing state
        const fishes = {...this.state.fishes};
        // 2. Add our new fish to that fishes variable
        fishes[`fish${Date.now()}`] = fish;
        // 3. Set the new fishes object to state
        this.setState({fishes});
    };

    loadSampleFishes = () => {
        this.setState({fishes});
    };

    addToOrder = (key) => {
        // 1. Take a copy of the existing state
        const order = {...this.state.order};
        // 2. Increment by one or add to order if fish doesn't exist
        order[key] = order[key] + 1 || 1;
        // 3. Set the new orders object to state
        this.setState({order});
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="fishes">
                        { Object.keys(this.state.fishes).map(
                            key => <Fish 
                                        key={key} 
                                        index={key} 
                                        details={this.state.fishes[key]} 
                                        addToOrder={this.addToOrder} 
                                    />
                            )
                        }
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} />
                <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />
            </div>
        )
    }
}

export default App;
