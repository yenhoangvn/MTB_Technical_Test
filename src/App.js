import "./App.css";
import mtblogo from "./images/logomtb.png";
import firebase from "firebase";
import { useEffect, useState } from "react";
import Cards from "./components/Cards";
import Pagination from "./components/Pagination";
import Filter from "./components/Filter";

function App() {
  const [startUpsDB, setStartUpsDB] = useState([]);
  const [originalDB, setOriginalDB] = useState([]);
  const [filterDB, setFilterDB] = useState({ country: [], industry: [] });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(3);
  // Get current posts
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = startUpsDB.slice(indexOfFirstCard, indexOfLastCard);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [sortType, setSortType] = useState("sorting");

  useEffect(() => {
    getStartUpsList();
  }, []);

  useEffect(() => {
    console.log("sort type", sortType);
  }, [sortType]);

  const firebaseConfig = {
    apiKey: "AIzaSyDZZs9n9VFY0cwIehsykh-JfCYq4LB-0Go",
    authDomain: "mtb-developer-exercise.firebaseapp.com",
    projectId: "mtb-developer-exercise",
    storageBucket: "mtb-developer-exercise.appspot.com",
    messagingSenderId: "803950763929",
    appId: "1:803950763929:web:dc7a4e23d563b4e3a07d08",
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }

  const getStartUpsList = async () => {
    const snapshot = await firebase.firestore().collection("test_data").get();
    const db = snapshot.docs.map((doc) => doc.data());
    const dbArray = Object.entries(db[0]);
    console.log(dbArray);
    setStartUpsDB(dbArray);
    setOriginalDB(dbArray);
    setLoading(false);
  };

  const industry = [];
  originalDB.forEach((ele) => {
    if (ele[1].Industry_Verticals__c !== null) {
      if (ele[1].Industry_Verticals__c.includes(";")) {
        const arr = ele[1].Industry_Verticals__c.split(";");
        arr.forEach((arr) => {
          if (!industry.some((element) => element.label === arr)) {
            industry.push({ value: arr, label: arr, quantity: 1, filter: 0 });
          } else {
            const index = industry.findIndex(
              (element) => element.label === arr
            );
            industry[index].quantity++;
          }
        });
      } else {
        if (
          !industry.some(
            (element) => element.label === ele[1].Industry_Verticals__c
          )
        ) {
          industry.push({
            value: ele[1].Industry_Verticals__c,
            label: ele[1].Industry_Verticals__c,
            quantity: 1,
            filter: 0,
          });
        } else {
          const index = industry.findIndex(
            (element) => element.label === ele[1].Industry_Verticals__c
          );
          industry[index].quantity++;
        }
      }
    }
  });
  const country = [];
  originalDB.forEach((ele) => {
    if (!country.some((element) => element.label === ele[1].HQ_Country__c)) {
      country.push({
        value: ele[1].HQ_Country__c,
        label: ele[1].HQ_Country__c,
        quantity: 1,
        filter: 0,
      });
    } else {
      const index = country.findIndex(
        (element) => element.label === ele[1].HQ_Country__c
      );
      country[index].quantity++;
    }
  });

  const displayStartUp = (filterInput, filterType) => {
    console.log("inpit ===>", filterInput);
    filterDB[filterType] = filterInput;
    const filterResult = [];
    setCurrentPage(1);
    console.log("filterDB", filterDB);
    if (filterDB["industry"].length === 0 && filterDB["country"].length === 0) {
      setStartUpsDB(originalDB);
    } else if (
      filterDB["industry"].length === 0 &&
      filterDB["country"].length !== 0
    ) {
      filterDB["country"].forEach((country) => {
        const filterDBCountry = originalDB.filter(
          (ele) =>
            ele[1]["HQ_Country__c"] !== null &&
            ele[1]["HQ_Country__c"]
              .toUpperCase()
              .includes(country.value.toUpperCase())
        );
        filterDBCountry.forEach((ele) => filterResult.push(ele));
      });
      setStartUpsDB(filterResult);
    } else if (
      filterDB["country"].length === 0 &&
      filterDB["industry"].length !== 0
    ) {
      filterDB["industry"].forEach((industry) => {
        const filterDBIndustry = originalDB.filter(
          (ele) =>
            ele[1]["Industry_Verticals__c"] !== null &&
            ele[1]["Industry_Verticals__c"]
              .toUpperCase()
              .includes(industry.value.toUpperCase())
        );
        filterDBIndustry.forEach((ele) => filterResult.push(ele));
      });
      setStartUpsDB(filterResult);
    } else {
      filterDB["country"].forEach((country) => {
        const filterDBCountry = originalDB.filter(
          (ele) =>
            ele[1]["HQ_Country__c"] !== null &&
            ele[1]["HQ_Country__c"]
              .toUpperCase()
              .includes(country.value.toUpperCase())
        );
        filterDBCountry.forEach((ele) => filterResult.push(ele));
      });
      const arrFinal = [];
      filterDB["industry"].forEach((industry) => {
        const filterDBIndustry = filterResult.filter(
          (ele) =>
            ele[1]["Industry_Verticals__c"] !== null &&
            ele[1]["Industry_Verticals__c"]
              .toUpperCase()
              .includes(industry.value.toUpperCase())
        );
        filterDBIndustry.forEach((ele) => arrFinal.push(ele));
      });
      setStartUpsDB(arrFinal);
      console.log("arr final ===>", arrFinal);
    }
    console.log("final result===>", startUpsDB);

    // const matches = originalDB.filter(ele =>{
    //   const regex= new RegExp(`${filterInput}`,"gi")
    //   // console.log(ele[1].HQ_Country__c.match(regex))
    //   return ele[1].HQ_Country__c.match(regex);
    // })
    // setSuggestion(matches);
    // console.log("matches",matches)
  };
  const sortingDB = (type) => {
    console.log(type);
    if (type === "ascendingYear") {
      const sortingProduct = startUpsDB.sort(
        (a, b) => a[1].Year_of_Establishment__c - b[1].Year_of_Establishment__c
      );
      console.log("sorting==>", sortingProduct);
      setStartUpsDB(sortingProduct);
    } else if (type === "descendingYear") {
      const sortingProduct = startUpsDB.sort(
        (a, b) => b[1].Year_of_Establishment__c - a[1].Year_of_Establishment__c
      );
      console.log("sorting==>", sortingProduct);
      setStartUpsDB(sortingProduct);
    }
    setSortType(type);
  };

  return (
    <div className="App">
      <div className="topBar">
        <img src={mtblogo} alt="logo blue color" />
        <div>
          <button className="btn_auth login">Login</button>
          <button className="btn_auth signUp">Sign Up</button>
        </div>
      </div>
      <div className="main_container">
        <div className="left_container">
          <Filter
            startUpsDB={startUpsDB}
            maxLenght={originalDB.length}
            country={country}
            industry={industry}
            displayStartUp={displayStartUp}
          />
        </div>
        <div className="right_container">
          <div className="right_main_content">
            <div className="sorting_outer">
              <select
                className="sorting"
                onChange={(e) => sortingDB(e.target.value)}
              >
                <option value="sorting">SORT</option>
                <option value="ascendingYear">
                  ESTABLISHMENT YEAR ASCENDING
                </option>
                <option value="descendingYear">
                  ESTABLISHMENT YEAR DESCENDING
                </option>
              </select>
            </div>
            <Cards cards={currentCards} loading={loading} />
            <Pagination
              currentPage={currentPage}
              cardsPerPage={cardsPerPage}
              totalCards={startUpsDB.length}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
