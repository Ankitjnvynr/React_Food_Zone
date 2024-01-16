import React from 'react'
import styled from 'styled-components';
import { BASE_URL, Button, Container } from '../App';

function SearchResult({ data }) {
    return (
        <FoodCardContainer>
            <Container>
                <FoodCards>
                    {
                        data?.map(({ name, image, text, price }) => (
                            <FoodCard key={name}>
                                <div className="food_image">
                                    <img src={BASE_URL + image} alt={BASE_URL + image} />
                                </div>
                                <div className="food_info">
                                    <div className="info">
                                        <h3>{name}</h3>
                                        <p>{text}</p>
                                    </div>
                                    <Button>${price.toFixed(2)}</Button>
                                </div>

                            </FoodCard>
                        ))
                    }
                </FoodCards>
            </Container>
        </FoodCardContainer>
    )
}

export default SearchResult

const FoodCardContainer = styled.section`
  background-image: url(./bg.png);
  min-height: calc(100vh - 225px);
`;

const FoodCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
const FoodCard = styled.div`
    max-width: 400px;
    background-color: rgba(0, 0, 0, 0.014);
    backdrop-filter: blur(5px);
    border: 1px solid white;
    border-radius: 10px;
    display: flex;
    padding:0 20px;
    justify-content: center;
    align-items: center;
    gap: 20px;
    

.food_image{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin-top: 10px;
}

.food_info{
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: end;
    
}
h3{
    /* font-size: 1.7rem; */
}
 p{
    font-size: 0.7rem;
}

`;
