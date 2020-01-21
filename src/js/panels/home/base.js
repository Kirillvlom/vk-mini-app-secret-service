import React from 'react';
import {connect} from 'react-redux';

import {goBack, setPage} from '../../store/router/actions';

import {Panel, PanelHeader, PanelHeaderContent, HeaderContext, List, Cell} from "@vkontakte/vkui"

import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';

import Icon24Done from '@vkontakte/icons/dist/24/done';
import Icon24UserIncoming from '@vkontakte/icons/dist/24/user_incoming';
import Icon24UserOutgoing from '@vkontakte/icons/dist/24/user_outgoing';
import Icon24Add from '@vkontakte/icons/dist/24/add';

class HomePanelBase extends React.Component {

    constructor (props) {
        super(props);
        
        this.state = {
            showImg: false,
            contextOpened: false
        };

        this.toggleContext = this.toggleContext.bind(this);
        this.select = this.select.bind(this);
    }

    toggleContext () {
        console.log('state', this.state)
        this.setState({ contextOpened: !this.state.contextOpened });
    }
    
    select (e) {
        const mode = e.currentTarget.dataset.mode;
        this.setState({ mode });
        requestAnimationFrame(this.toggleContext);
    }


    render() {
        const {id, setPage} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader>
                    <PanelHeaderContent aside={<Icon16Dropdown />} onClick={this.toggleContext}>
                    Сообщения
                    </PanelHeaderContent>
                </PanelHeader>
                <HeaderContext opened={this.state.contextOpened} onClose={this.toggleContext}>
                    <List>
                    <Cell
                        before={<Icon24UserIncoming />}
                        asideContent={this.state.mode === 'all' ? <Icon24Done fill="var(--accent)" /> : null}
                        onClick={this.select}
                        data-mode="all"
                    >
                        Входящие
                    </Cell>
                    <Cell
                        before={<Icon24UserOutgoing />}
                        asideContent={this.state.mode === 'managed' ? <Icon24Done fill="var(--accent)" /> : null}
                        onClick={this.select}
                        data-mode="managed"
                    >
                        Исходящие
                    </Cell>
                    </List>
                </HeaderContext>
            </Panel>
        );
    }

}

const mapDispatchToProps = {
    setPage,
    goBack
};

export default connect(null, mapDispatchToProps)(HomePanelBase);