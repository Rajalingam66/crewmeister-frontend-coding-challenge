import styled from "styled-components";

const Title = styled.h4`
  color: #ff9419;
  width: 50%;
`;
const Records = styled.p`
  width: 15%;
  margin: 0;
  background: #fefdfb;
  padding: 0.2rem;
  border: 1px solid #ff9419;
  color: #ff9419;
  font-weight: 600;
`;
const Count = styled.span`
  font-size: 18px;
  margin-left: 10px;
`;
const Header = (totalCount) => {
  return (
    <div className="flex justify-content-between">
      <Title>Absence Manager</Title>
      <Records>
        <span>Absence count</span>
        <Count>{totalCount} </Count>{" "}
      </Records>
    </div>
  );
};

export default Header;
