import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Wrapper from "../../components/Wrapper";
import { fetchSearchSpot } from "../../api";
import { mainStyle } from "../../GlobalStyled";

const Container = styled.section`
  width: 100%;
  height: 100vh;
  max-width: 440px;
  margin: 0 auto;
  padding: 0 ${mainStyle.moPadding};
`;
const Form = styled.form``;
const ConWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 10px;
  row-gap: 20px;
`;
const Con = styled.div``;
const NoResults = styled.p``;
const ResultText = styled.div``;

const Search = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [term, setTerm] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState();

  const onSearch = async (data) => {
    const { search: keyword } = data;
    setSearchKeyword(keyword);
    setIsSearching(true);

    try {
      const { results } = await fetchSearchSpot(keyword);
      console.log("결과", results);
      setTerm(results || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSearching(false);
    }
  };
  return (
    <Wrapper>
      <Container>
        <Form onSubmit={handleSubmit(onSearch)}>
          <input
            {...register("search", {
              required: "검색할 장소를 입력해주세요.",
            })}
            type="text"
            placeholder="장소"
          ></input>
          {errors.search && <p>{errors.search.message}</p>}
        </Form>
        {isSearching && <NoResults>검색 중...</NoResults>}
        {!isSearching && term.length === 0 && (
          <NoResults>검색 결과가 없습니다.</NoResults>
        )}
        {!isSearching && term.length > 0 && (
          <ResultText>
            검색하신 "{searchKeyword}" 에 대한 결과입니다.
          </ResultText>
        )}
        {term && (
          <ConWrap>
            {term.map((data) => (
              <Con key={data.id}>
                <Link to={`/detail/${data.id}`}>
                  <img src={data.img} alt={data.name}></img>
                  <h3>{data.name}</h3>
                </Link>
              </Con>
            ))}
          </ConWrap>
        )}
      </Container>
    </Wrapper>
  );
};

export default Search;
