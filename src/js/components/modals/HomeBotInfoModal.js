import React from 'react';
import {connect} from 'react-redux';

import {ModalPage, ModalPageHeader, HeaderButton, IS_PLATFORM_IOS, FormLayout, Input, Textarea, Button, Div} from "@vkontakte/vkui";
import '@vkontakte/vkui/dist/vkui.css';
import {deleteNote} from '../../services/requests'

import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

class HomeBotsListModal extends React.Component {

    componentDidMount() {
        deleteNote(`http://localhost:8081/${this.props.note.uniqUrl}/${this.props.note.validPassword}`)
    }

    render() {
        const {id, onClose} = this.props;
        const {comment, description, uniqUrl} = this.props.note;

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
                    {uniqUrl}
                    </ModalPageHeader>
                }
                onClose={onClose}
                settlingHeight={80}
            >
               <FormLayout>
                    <Input type="text" name="comment" value={comment} onChange={this.onChange} top="Комментарий" bottom="Комментарий не будет зашифрован и будет виден всем пользователям" placeholder="Введите комментарий" /> 
                    <Textarea name="message" splaceholder="Очень важный и секретный уже расшифрованный текст" value={description} top="Текст сообщения" />
                </FormLayout>
            </ModalPage>
        );
    }

}

export default connect()(HomeBotsListModal);