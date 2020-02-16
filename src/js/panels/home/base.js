import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {goBack, setPage, openModal} from '../../store/router/actions';

import {Panel, PanelHeader, List, Group, Cell} from "@vkontakte/vkui"

import {getNotesByUser} from '../../services/requests'

import * as VK from '../../services/VK';

class HomePanelBase extends React.Component {

    constructor (props) {
      super(props);
      
      this.state = {
          showImg: false,
          contextOpened: false,
          user: '',
          notes: [{id: 228, uniqUrl: 'sdsSd2', comment: 'test'}]
      };
    }

    componentDidMount() {
      if (this.props.accessToken === undefined) {
        this.getAuthToken();
      } else {
        this.getCurentUser();
      }
    }
  
    componentDidUpdate(prevProps, prevState, snapshot) {
      if (this.props !== prevProps) {
        if (this.props.accessToken === null) {
          this.setState({
            loading: false,
            errorGetAuthToken: true
          });
        } else {
          this.setState({
            loading: true,
            errorGetAuthToken: false
          });
          this.getCurentUser();
        }
      }
    }
  
    getAuthToken() {
      console.log('props', this.props)
      this.props.dispatch(VK.getAuthToken(['groups']));
    } 
  
    async getCurentUser() {
      let currentUser = await VK.currentUserGet();
  
      this.setState({
          user: currentUser,
          loading: true
      });

      await this.getCurrentNotes()
    }

    async getCurrentNotes() {
      let notes = await getNotesByUser(`http://localhost:8081/notes/${this.state.user[0].id}`)

      this.setState({
        notes: notes,
        loading: false
    });
    }

    render() {
        const {id, setPage} = this.props;

        return (
            <Panel id={id}>
               <PanelHeader>Сообщения</PanelHeader>
               <Group title="Мои сообщения">
                  <List>
                    {this.state.notes.map((note) => {
                      return (<Cell
                      key={note.id}
                      stretched={true} 
                      onClick={() => this.props.openModal("MODAL_PAGE_BOTS_LIST", note)}
                      description={note.uniqUrl}
                      >
                        {note.comment || 'Без комментария'}
                      </Cell>)
                    })
                  }
                  </List>
                </Group>
            </Panel>
        );
    }

}

function mapDispatchToProps(dispatch) {
  return {
      dispatch,
      ...bindActionCreators({goBack, setPage, openModal}, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
      accessToken: state.vkui.accessToken
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePanelBase);