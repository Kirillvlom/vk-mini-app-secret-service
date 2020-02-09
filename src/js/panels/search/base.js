import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {goBack, openPopout, closePopout, openModal} from "../../store/router/actions";
import * as VK from '../../services/VK';

import {notesCreateNote, findNote} from '../../services/requests'

import {Panel, Button, PanelHeader, FormLayoutGroup, FormLayout, Input, Textarea, Search, Group, List, Cell} from "@vkontakte/vkui"

class HomePanelGroups extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      loading: true,
      errorGetAuthToken: false,
      password: '',
      secondPassword: '',
      message: '',
      comment: '',
      note: {},
      correctPassword: true,
      correctMessage: true,
      user: '',
      search: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if (this.props.accessToken === undefined) {
      this.getAuthToken();
    } else {
      this.onChange('')
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
    this.props.dispatch(VK.getAuthToken(['groups']));
  } 

  async getCurentUser() {
    let currentUser = await VK.currentUserGet();   

    this.setState({
        user: currentUser,
        loading: false
    });
  }

  onChange (search) {
    let url = 'http://localhost:8081/' + 'ping'
    if(search.length > 0) url = 'http://localhost:8081/' + search 

    findNote(url).then((note) => {
      if(note) {
        this.setState({ note: note, search: search })}
    })
  }

  sendRequest(){

    let url = 'http://localhost:8081/notes'
    let data = {
      comment: this.state.comment,
      password: this.state.password,
      description: this.state.message,
      user: this.state.user
    }

    notesCreateNote(url, data)
  }

  render() {
    const {id, goBack} = this.props;
    const { note  } = this.state;

    const itemStyle = {
      flexShrink: 0,
      width: 80,
      height: 94,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontSize: 12
    };

    console.log(this.state)

    return (
      <Panel id={id} theme="white">
        <PanelHeader>Поиск сообщения</PanelHeader>
        <Search value={this.state.search} onSubmit={()=> {console.log('+')}} onChange={this.onChange}/>
        <Group title="Найденные сообщения">
          <List>
            <Cell
              description={note.uniqUrl}
              >
                {note.comment || 'Без комментария'}
            </Cell>
          </List>
        </Group>
      </Panel>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
      dispatch,
      ...bindActionCreators({goBack, openPopout, closePopout, openModal}, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
      accessToken: state.vkui.accessToken
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePanelGroups);