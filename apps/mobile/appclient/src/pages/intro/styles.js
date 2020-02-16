import styled from 'styled-components';

const Logo = styled.Image `
  width: 80%;
  marginBottom: 40px;
`;

const Button = styled.TouchableOpacity `
  padding: 20px;
  borderRadius: 5px;
  backgroundColor: #4F94CD;
  alignSelf: stretch;
  margin: 15px;
  marginHorizontal: 20px;
`;

const ButtonText = styled.Text `
  color: #FFF;
  fontWeight: bold;
  fontSize: 16px;
  textAlign: center;
`;

const Container = styled.View `
  flex: 1;
  justifyContent: center;
  alignItems: center;
  overflow: hidden;
  backgroundColor: #263238;
  padding: 20px
`;

const Text = styled.Text `
  fontSize: 16px;
  marginBottom: 15px;
  marginHorizontal: 20px;
  color: #FFF;
`;

export {
    Logo,
    Button,
    ButtonText,
    Container,
    Text,
}