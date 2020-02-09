import React, {PureComponent} from 'react';

import {Cell} from "@vkontakte/vkui";

class NoteCell extends PureComponent {

    render() {
        const {comment, uniqUrl} = this.props;

        let comm = comment.length > 0 ? comment : "Комментарий отсутствует";

        return (
            <Cell
                stretched={true} 
                onClick={() => setPage('modal', 'filters')}
                description={uniqUrl}
            >
                {comm}
            </Cell>
        )
    }

}

export default NoteCell;