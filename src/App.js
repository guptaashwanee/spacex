import "./App.css";
import Footer from "./Components/Layout/Footer";
import Navbar from "./Components/Layout/Navbar";
import Home from "./Components/Home/Home";

function App() {
	return (
		<div className="App">
			<Navbar></Navbar>
			<Home></Home>
			<Footer></Footer>
		</div>
	);
}

export default App;
