import React from 'react';
import {connect} from 'react-redux';

import {openModal} from "../../store/router/actions";

import {List, Cell, Avatar, ModalPage, ModalPageHeader, HeaderButton, IS_PLATFORM_IOS, Input, FormLayout, Button} from "@vkontakte/vkui";

import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Chevron from '@vkontakte/icons/dist/24/chevron';

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

    render() {
        const {id, onClose, openModal} = this.props;

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
                onClose={onClose}
                settlingHeight={80}
            >
            <FormLayout>
                <Input type="password" name="password" placeholder="Введите пароль" />
                <Button onClick={() => openModal('MODAL_PAGE_BOT_INFO')} size="xl">Расшифровать</Button>
            </FormLayout>
            </ModalPage>
        );
    }

}

const mapDispatchToProps = {
    openModal
};

export default connect(null, mapDispatchToProps)(HomeBotsListModal);