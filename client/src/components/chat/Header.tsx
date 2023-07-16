import styled from "styled-components";

const Container = styled.div`
  display: flex;
  padding: 1rem;
  width: 100%;
  background-color: #dddddd;
`;
const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;
const Username = styled.div`
  font-size: 18px;
`;
const Avatar = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: contain;
`;

type Props = {
  avatar: string;
  username: string;
};

const Header = ({ avatar, username }: Props) => {
  return (
    <Container>
      <Group>
        <Avatar src={avatar} />
        <Username>{username}</Username>
      </Group>
    </Container>
  );
};

export default Header;
