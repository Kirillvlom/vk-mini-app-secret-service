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

class HomePanelProfile extends React.Component {

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

    componentWillUnmount() {
        const {setScrollPositionByID, setActiveTab} = this.props;

        setActiveTab("EXAMPLE", this.state.activeTab);
        setScrollPositionByID("EXAMPLE_TABS_LIST");
    }

    componentDidMount() {
        restoreScrollPosition();
    }

    render() {
        const {id, setPage} = this.props;
        const boxStyle = {marginTop: 56};

        return (
            <Panel id={id}>
                <PanelHeader noShadow={true}>Меню</PanelHeader>
                <FixedLayout vertical="top">
                    <Tabs theme="header" type="buttons">
                        <HorizontalScroll id="EXAMPLE_TABS_LIST">
                            <TabsItem
                                onClick={() => this.setTab('modal')}
                                selected={this.state.activeTab === 'modal'}
                            >
                                Друзья
                            </TabsItem>
                            <TabsItem
                                onClick={() => this.setTab('test2')}
                                selected={this.state.activeTab === 'test2'}
                            >
                                Настройки
                            </TabsItem>
                        </HorizontalScroll>
                    </Tabs>
                </FixedLayout>
                <Group style={boxStyle}>
                    {this.state.activeTab === 'modal' && <CellButton onClick={() => setPage('modal', 'filters')}>
                        Открыть модальное окно
                    </CellButton>}

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

export default connect(mapStateToProps, mapDispatchToProps)(HomePanelProfile);