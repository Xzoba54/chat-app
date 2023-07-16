import { NavLink } from "react-router-dom";
import styled from "styled-components";

interface ContainerProps {
  active: string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  gap: 8px;
  cursor: default;

  background-color: ${(props) => (props.active === "true" ? "#e0e0e0" : "#fff")};

  &:hover {
    background-color: #e0e0e0;
  }
`;
const AvatarContainer = styled.div``;
const Avatar = styled.img`
  width: 45px;
  height: 45px;
  object-fit: contain;
  border-radius: 50%;
`;
const Group = styled.div`
  display: flex;
  gap: 8px;
`;
const Data = styled.div`
  width: 190px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Username = styled.span`
  font-weight: 500;
  font-size: 18px;
  color: #000;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const LastMessage = styled.span`
  font-weight: 400;
  color: #3a3a3a;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const DateContainer = styled.div``;
const Date = styled.span`
  color: #000;
`;

type Props = {
  id: number;
  username: string;
  isActive: string;
};

const User = ({ username, id, isActive }: Props) => {
  return (
    <NavLink to={`/${id}`}>
      <Container active={isActive}>
        <Group>
          <AvatarContainer>
            <Avatar src="https://cdn.discordapp.com/attachments/753648968751120443/1117084268779274320/20220329_110705.jpg" />
          </AvatarContainer>
          <Data>
            <Username>{username}</Username>
            <LastMessage>Last message</LastMessage>
          </Data>
        </Group>
        <DateContainer>
          <Date>26.07 </Date>
        </DateContainer>
      </Container>
    </NavLink>
  );
};

export default User;
