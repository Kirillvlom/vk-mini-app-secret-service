import React from 'react';
import {connect} from 'react-redux';

import {setPage} from "../../store/router/actions";
import {setActiveTab, setScrollPositionByID} from "../../store/vk/actions";
import {restoreScrollPosition} from "../../services/_functions";

import {
    Div,
    Panel,
    Group,
    CellButton,
    PanelHeader,
    FixedLayout,
    HorizontalScroll,
    TabsItem,
    Tabs
} from "@vkontakte/vkui";

class ExplorePanelBase extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTab: props.activeTab["EXAMPLE"] || "modal"
        };
    }

    setTab(tab) {
        this.setState({
            activeTab: tab
        });
    }

    render() {
        const {id, setPage} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader noShadow={true}>Меню</PanelHeader>
                <Group>
                    <CellButton onClick={() => setPage('modal', 'filters')}>
                        Поддержать разработчика
                    </CellButton>
                    <CellButton onClick={() => setPage('modal', 'filters')}>
                      О приложении
                    </CellButton>
                    <CellButton onClick={() => setPage('modal', 'filters')}>
                      Политика конфеденциальности
                    </CellButton>

                    {this.state.activeTab !== 'modal' && <Div>{this.state.activeTab}</Div>}
                </Group>
            </Panel>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        activeTab: state.vkui.activeTab,
    };
};

const mapDispatchToProps = {
    setPage,
    setActiveTab,
    setScrollPositionByID
};

export default connect(mapStateToProps, mapDispatchToProps)(ExplorePanelBase);