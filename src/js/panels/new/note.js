import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';

import {Avatar, Panel, Alert, Group, Button, PanelHeader, FormLayoutGroup, FormLayout, Input, Textarea, Header, HorizontalScroll} from "@vkontakte/vkui"

import Icon24User from '@vkontakte/icons/dist/24/user';

class HomePanelBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      secondPassword: '',
      message: ''
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    console.log('e', e.currentTarget)
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  }

  render() {
    const { password, secondPassword, message } = this.state;
    const {id} = this.props;
    const itemStyle = {
      flexShrink: 0,
      width: 80,
      height: 94,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontSize: 12
    };

    return (
        <Panel id={id} theme="white">
          <PanelHeader>Новое сообщение</PanelHeader>
          <Group style={{ paddingBottom: 8 }}>
            <Header level="secondary">Друзья</Header>
            <HorizontalScroll>
              <div style={{ display: 'flex' }}>
                <div style={{ ...itemStyle, paddingLeft: 4 }}>
                  <Avatar size={64} style={{ marginBottom: 8 }}><Icon24User /></Avatar>
                  Элджей
                </div>
                <div style={itemStyle}>
                  <Avatar size={64} style={{ marginBottom: 8 }}><Icon24User /></Avatar>
                  Ольга
                </div>
                <div style={itemStyle}>
                  <Avatar size={64} style={{ marginBottom: 8 }}><Icon24User /></Avatar>
                  Сергей
                </div>
                <div style={itemStyle}>
                  <Avatar size={64} style={{ marginBottom: 8 }}><Icon24User /></Avatar>
                  Илья
                </div>
                <div style={itemStyle}>
                  <Avatar size={64} style={{ marginBottom: 8 }}><Icon24User /></Avatar>
                  Алексей
                </div>
                <div style={itemStyle}>
                  <Avatar size={64} style={{ marginBottom: 8 }}><Icon24User /></Avatar>
                  Костя
                </div>
                <div style={itemStyle}>
                  <Avatar size={64} style={{ marginBottom: 8 }}><Icon24User /></Avatar>
                  Миша
                </div>
                <div style={{ ...itemStyle, paddingRight: 4 }}>
                  <Avatar size={64} style={{ marginBottom: 8 }}><Icon24User /></Avatar>
                  Вадим
                </div>
              </div>
            </HorizontalScroll>
          </Group>
          <FormLayout>
            <FormLayoutGroup top="Пароль" bottom="Пароль может содержать только латинские буквы и цифры.">
              <Input type="password" name="password" value={password} onChange={this.onChange} placeholder="Введите пароль" />
              <Input type="password" name="secondPassword" value={secondPassword} onChange={this.onChange} placeholder="Повторите пароль" />
            </FormLayoutGroup>
            <Textarea  onChange={this.onChange} name="message" value={message} top="Текст сообщения" />
            <Button size="xl">Отправить</Button>
          </FormLayout>
        </Panel>
    );
  }
}

const mapDispatchToProps = {
    setPage,
    goBack,
    openPopout,
    closePopout,
    openModal
};

export default connect(null, mapDispatchToProps)(HomePanelBase);