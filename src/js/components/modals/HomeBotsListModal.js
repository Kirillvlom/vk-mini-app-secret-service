import React from 'react';
import {connect} from 'react-redux';

import {openModal} from "../../store/router/actions";
import {aceesToNote} from '../../services/requests'

import { ModalPage, ModalPageHeader, HeaderButton, IS_PLATFORM_IOS, Input, FormLayout, Button} from "@vkontakte/vkui";

import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

const bots = [
    {
        name: 'VKS',
        avatar: 'https://pp.userapi.com/c851520/v851520442/48ce/Sik7V4c58qw.jpg',
        desc: 'Нет, меня не роняли в детстве'
    },
    {
        name: 'Недобот',
        avatar: 'https://pp.userapi.com/c854420/v854420431/da51/X8ohw4-4Fk4.jpg',
        desc: 'Я ни разу не пил кокосовое молоко'
    },
    {
        name: 'Callback API Бот',
        avatar: 'https://pp.userapi.com/c846523/v846523036/1e69b7/UxWZ1yAqY7I.jpg',
        desc: 'Даже не спрашивай'
    },
];

class HomeBotsListModal extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
          password: '',
          correctPassword: true
        };
    
        this.onChange = this.onChange.bind(this);
    }

    
  onChange(e) {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  }

  async sendRequest() {
    let note = await aceesToNote(`http://localhost:8081/${this.props.note.uniqUrl}/${this.state.password}`)
    if(note.description) {
        note = { 
            comment: this.props.note.comment,
            uniqUrl: this.props.note.uniqUrl,
            validPassword: this.state.password,
            ...note 
        }
        this.props.openModal('MODAL_PAGE_BOT_INFO', note)
    } else {
        this.setState({ correctPassword: false });
    } 
  }

  passwordToNote() {
      
  }

    render() {
        const {id, onClose} = this.props;
        const {password, correctPassword} = this.state;

        return (
            <ModalPage
                id={id}
                header={
                    <ModalPageHeader
                        left={!IS_PLATFORM_IOS &&
                        <HeaderButton onClick={onClose}><Icon24Cancel/></HeaderButton>}
                        right={IS_PLATFORM_IOS &&
                        <HeaderButton onClick={onClose}><Icon24Dismiss/></HeaderButton>}
                    >
                        Введите пароль для расшифровки:
                    </ModalPageHeader>
                }
                onClick={onClose}
                settlingHeight={80}
            >
            <FormLayout>
                <Input type="password" name="password"  value={password} onChange={this.onChange}  status={correctPassword ? '' : 'error'} placeholder={correctPassword ? 'Введите пароль' : 'Пароль не верный!'} />
                <Button onClick={() => this.sendRequest()} size="xl">Расшифровать</Button>
            </FormLayout>
            </ModalPage>
        );
    }

}

const mapDispatchToProps = {
    openModal
};

export default connect(null, mapDispatchToProps)(HomeBotsListModal);