import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SearchResult from './components/SearchResult';


export const BASE_URL = "http://localhost:9000";


function App() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setErrror] = useState(null);
  const [FiltereredData, setFilteredData] = useState(null);
  const [selectedBtn,setSelectedBtn] = useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true)
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setTimeout(() => {
          setData(json)
          setFilteredData(json)
          setLoading(false);
        }, 1000);

      } catch (error) {
        setErrror("unable to fetch data");
        setErrror(error);
      }
    }
    fetchFoodData()
  }, [])

  const filterFood = (type)=>{
    if(type=="all"){
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }
    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedBtn(type)
  }

  const filterBtns = [
    {
      name:"All",
      type:"all",
    },
    {
      name:"Breakfast",
      type:"Breakfast",
    },
    {
      name:"Lunch",
      type:"Lunch",
    },
    {
      name:"Dinner",
      type:"Dinner",
    },
  ]

  const searchFood = (e) => {
    const searchValue = e.target.value;
    if (searchValue == "") {
      setFilteredData(null)
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    // console.log(filter)
    setFilteredData(filter);
  }


  if (error) return <div>{error}</div>
  if (loading) return <div>{loading} loading.....</div>

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/logo.svg" alt="logo" />
          </div>
          <div className="search">
            <input onChange={searchFood} placeholder='Search Food' />
          </div>

        </TopContainer>

        <FilterContainer>
          {
            filterBtns.map((value)=>(
              <Button key={value.name} onClick={()=>filterFood(value.type)} >{value.name}</Button>
            ))
          }
          
        </FilterContainer>


      </Container>
      <SearchResult data={FiltereredData} />
    </>
  )
}

export default App

export const Container = styled.div`
   /* background-color:#323334; */
   max-width: 1200px;
   margin: 0 auto;
`;
const TopContainer = styled.div`
  min-height: 140px;
  display: flex;
  justify-content: space-between;
  pad: 16px;
  align-items: center;

  .search input{
    background-color: transparent;
    border: 1px solid red;
    border-radius: 5px;
    height: 16px;
    padding:  15px 6px;
    color: white;
    font-size: 16px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 50px;
`;

export const Button = styled.button`
  background-color: #ff4343;
  border-radius: 5px;
  padding: 6px 12px;
  color: white;
  border: none;
  cursor: pointer;

  &:hover{
  background-color: #bb1616;

  }
`;

