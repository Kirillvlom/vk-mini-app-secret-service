import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {goBack, closeModal, setStory} from "./js/store/router/actions";
import * as VK from './js/services/VK';

import {Epic, View, Root, Tabbar, TabbarItem, ConfigProvider} from "@vkontakte/vkui";

import Icon28Messages from '@vkontakte/icons/dist/28/messages';
import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';

import NewNotePanelBase from './js/panels/new/note';

import HomePanelBase from './js/panels/home/base';
import HomePanelGroups from './js/panels/home/groups';

import MorePanelBase from './js/panels/more/base';
import MorePanelExample from './js/panels/more/example';

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
        const {goBack, setStory, popouts, activeView, activeStory, activePanel, panelsHistory, colorScheme} = this.props;

        let history = (panelsHistory[activeView] === undefined) ? [activeView] : panelsHistory[activeView];
        let popout = (popouts[activeView] === undefined) ? null : popouts[activeView];

        return (
            <ConfigProvider isWebView={true} scheme={colorScheme}>
                <Epic activeStory={activeStory} tabbar={
                    <Tabbar>
                        <TabbarItem
                            onClick={() => setStory('home', 'base')}
                            selected={activeStory === 'home'}
                        ><Icon28Messages/></TabbarItem>
                         <TabbarItem
                            onClick={() => setStory('new', 'note')}
                            selected={activeStory === 'new'}
                        ><Icon28AddOutline/></TabbarItem>
                        {/* <TabbarItem
                            onClick={() => setStory('more', 'callmodal')}
                            selected={activeStory === 'more'}
                        ><Icon28More/></TabbarItem> */}
                    </Tabbar>
                }>
                    <Root id="home" activeView={activeView} popout={popout}>
                        <View
                            id="home"
                            activePanel={activePanel}
                            history={history}
                            onSwipeBack={() => goBack()}
                        >
                            <HomePanelBase id="base" withoutEpic={false}/>
                            <HomePanelGroups id="groups"/>
                        </View>
                    </Root>
                    <Root id="new" activeView={activeView} popout={popout}>
                        <View
                            id="new"
                            activePanel={activePanel}
                            history={history}
                            onSwipeBack={() => goBack()}
                        >
                            <NewNotePanelBase id="note"/>
                        </View>
                    </Root>
                    <Root id="more" activeView={activeView} popout={popout}>
                        <View
                            id="more"
                            activePanel={activePanel}
                            history={history}
                            onSwipeBack={() => goBack()}
                        >
                            <MorePanelBase id="callmodal"/>
                        </View>
                        <View
                            id="modal"
                            activePanel={activePanel}
                            history={history}
                            onSwipeBack={() => goBack()}
                        >
                            <MorePanelExample id="filters"/>
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