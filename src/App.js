import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {goBack, closeModal, setStory} from "./js/store/router/actions";
import * as VK from './js/services/VK';

import {Epic, View, Root, Tabbar, TabbarItem, ConfigProvider, ModalRoot} from "@vkontakte/vkui";

import Icon28Messages from '@vkontakte/icons/dist/28/messages';
import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';
import Icon28Search from '@vkontakte/icons/dist/28/search';

import NewNotePanelBase from './js/panels/notes/new';
import HomePanelBase from './js/panels/home/base';
import SearchPanelBase from './js/panels/search/base';


import HomeBotsListModal from './js/components/modals/HomeBotsListModal';
import HomeBotInfoModal from './js/components/modals/HomeBotInfoModal';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.lastAndroidBackAction = 0;
    }

    componentDidMount() {
        const {goBack, dispatch} = this.props;

        dispatch(VK.initApp());

        window.onpopstate = () => {
            let timeNow = +new Date();

            if (timeNow - this.lastAndroidBackAction > 500) {
                this.lastAndroidBackAction = timeNow;

                goBack('Android');
            } else {
                window.history.pushState(null, null);
            }
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {activeView, activeStory, activePanel, scrollPosition} = this.props;

        if (
            prevProps.activeView !== activeView ||
            prevProps.activePanel !== activePanel ||
            prevProps.activeStory !== activeStory
        ) {
            let pageScrollPosition = scrollPosition[activeStory + "_" + activeView + "_" + activePanel] || 0;

            window.scroll(0, pageScrollPosition);
        }
    }

    render() {
        const {goBack, setStory, closeModal, popouts, activeView, activeStory, activePanel, activeModals, panelsHistory, colorScheme} = this.props;

        let history = (panelsHistory[activeView] === undefined) ? [activeView] : panelsHistory[activeView];
        let popout = (popouts[activeView] === undefined) ? null : popouts[activeView];
        let activeModal = (activeModals[activeView] === undefined) ? null : activeModals[activeView];

        console.log('this.props APP', this.props)

        const homeModals = (
            <ModalRoot activeModal={activeModal}>
                <HomeBotsListModal
                    id="MODAL_PAGE_BOTS_LIST"
                    onClose={() => closeModal()}
                />
                <HomeBotInfoModal
                    id="MODAL_PAGE_BOT_INFO"
                    onClose={() => closeModal()}
                />
            </ModalRoot>
        );

        return (
            <ConfigProvider isWebView={true} scheme={colorScheme}>
                <Epic activeStory={activeStory} tabbar={
                    <Tabbar>
                        <TabbarItem
                            onClick={() => setStory('home', 'base')}
                            selected={activeStory === 'home'}
                        ><Icon28Messages/></TabbarItem>
                         <TabbarItem
                            onClick={() => setStory('note', 'new')}
                            selected={activeStory === 'note'}
                        ><Icon28AddOutline/></TabbarItem>
                        <TabbarItem
                            onClick={() => setStory('search', 'base')}
                            selected={activeStory === 'search'}
                        ><Icon28Search/></TabbarItem>
                    </Tabbar>
                }>
                    <Root id="home" activeView={activeView} popout={popout}>
                        <View
                            id="home"
                            modal={homeModals}
                            activePanel={activePanel}
                            history={history}
                            onSwipeBack={() => goBack()}
                        >
                            <HomePanelBase id="base"/>
                        </View>
                    </Root>
                    <Root id="note" activeView={activeView} popout={popout}>
                        <View
                            id="note"
                            activePanel={activePanel}
                            history={history}
                            onSwipeBack={() => goBack()}
                        >
                            <NewNotePanelBase id="new"/>
                        </View>
                    </Root>
                    <Root id="search" activeView={activeView} popout={popout}>
                        <View
                            id="search"
                            activePanel={activePanel}
                            history={history}
                            onSwipeBack={() => goBack()}
                        >
                            <SearchPanelBase id="base"/>
                        </View>
                    </Root>
                </Epic>
            </ConfigProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        activeView: state.router.activeView,
        activePanel: state.router.activePanel,
        activeStory: state.router.activeStory,
        activeModals: state.router.activeModals,
        panelsHistory: state.router.panelsHistory,
        popouts: state.router.popouts,
        scrollPosition: state.router.scrollPosition,

        colorScheme: state.vkui.colorScheme
    };
};


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({setStory, goBack, closeModal}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);