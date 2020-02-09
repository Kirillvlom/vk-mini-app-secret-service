import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {goBack, openPopout, closePopout, openModal} from "../../store/router/actions";
import * as VK from '../../services/VK';

import {notesCreateNote, getNotesByUser} from '../../services/requests'

import {Panel, Button, PanelHeader, FormLayoutGroup, FormLayout, Input, Textarea} from "@vkontakte/vkui"

class HomePanelGroups extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      loading: true,
      errorGetAuthToken: false,
      password: '',
      secondPassword: '',
      message: '',
      comment: '',
      correctPassword: true,
      correctMessage: true,
      user: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if (this.props.accessToken === undefined) {
      this.getAuthToken();
    } else {
      this.getCurentUser();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props !== prevProps) {
      if (this.props.accessToken === null) {
        this.setState({
          loading: false,
          errorGetAuthToken: true
        });
      } else {
        this.setState({
          loading: true,
          errorGetAuthToken: false
        });

        this.getCurentUser();
      }
    }
  }

  getAuthToken() {
    this.props.dispatch(VK.getAuthToken(['groups']));
  } 

  async getCurentUser() {
    let currentUser = await VK.currentUserGet();   

    this.setState({
        user: currentUser,
        loading: false
    });
  }

  onChange(e) {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  }

  sendRequest(){

    let url = 'http://localhost:8081/notes'
    let data = {
      comment: this.state.comment,
      password: this.state.password,
      description: this.state.message,
      user: this.state.user
    }

    notesCreateNote(url, data)
  }

  render() {
    const {id, goBack} = this.props;
    const { password, secondPassword, message, correctPassword, correctMessage, comment  } = this.state;

    const itemStyle = {
      flexShrink: 0,
      width: 80,
      height: 94,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontSize: 12
    };

    console.log('props', this.props)

    return (
      <Panel id={id} theme="white">
        <PanelHeader>Новое сообщение</PanelHeader>
        <FormLayout>
          <Input type="text" name="comment" value={comment} onChange={this.onChange} top="Комментарий" bottom="Комментарий не будет зашифрован и будет виден всем пользователям" placeholder="Введите комментарий" />
          <FormLayoutGroup top="Пароль" status={correctPassword ? '' : 'error'} onChange={this.onChange} bottom={correctPassword ? 'Пароли должны совпадать' : 'Ваши пароли не совпадают!'}>
            <Input type="password" name="password" value={password} onChange={this.onChange} status={correctPassword ? '' : 'error'} placeholder="Введите пароль" />
            <Input 
              type="password" 
              name="secondPassword"   
              value={secondPassword} 
              onChange={this.onChange} 
              placeholder="Повторите пароль"
              status={correctPassword ? '' : 'error'}
            />
          </FormLayoutGroup>
          <Textarea onChange={this.onChange} name="message" bottom={correctMessage ? '' : 'Введите ваше сообщение!'} status={correctMessage ? '' : 'error'} placeholder="Очень важный и секретный текст" value={message} top="Текст сообщения" />
          <Button onClick={() => this.sendRequest()} size="xl">Создать</Button>
        </FormLayout>
      </Panel>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
      dispatch,
      ...bindActionCreators({goBack, openPopout, closePopout, openModal}, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
      accessToken: state.vkui.accessToken
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePanelGroups);