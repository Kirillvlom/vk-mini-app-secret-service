import React from 'react';
import {connect} from 'react-redux';

import {Cell, List, Avatar, InfoRow, ModalPage, ModalPageHeader, HeaderButton, IS_PLATFORM_IOS, FormLayout, Input, Textarea, Button, Div} from "@vkontakte/vkui";
import '@vkontakte/vkui/dist/vkui.css';

import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

class HomeBotsListModal extends React.Component {

    render() {
        const {id, onClose} = this.props;

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
                        Комментарий 
                    </ModalPageHeader>
                }
                onClose={onClose}
                settlingHeight={80}
            >
               <FormLayout>
                    <Input type="text" name="comment" onChange={this.onChange} top="Комментарий" bottom="Комментарий не будет зашифрован и будет виден всем пользователям" placeholder="Введите комментарий" /> 
                    <Textarea name="message" splaceholder="Очень важный и секретный уже расшифрованный текст" top="Текст сообщения" />
                    <Div style={{display: 'flex', padding: 0}}>
                        <Button size="xl" style={{ marginRight: 8, backgroundColor: '#e64646' }}>Удалить</Button>
                        <Button size="xl">Сохранить</Button>
                    </Div>
                </FormLayout>
            </ModalPage>
        );
    }

}

export default connect()(HomeBotsListModal);