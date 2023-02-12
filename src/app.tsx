import * as React from 'react';
import { createRoot } from 'react-dom/client';
import './firebase';

const App: React.FC = () => {

  const [selectedBoard, setSelectedBoard] = React.useState<BoardPickerSelectResult>();

  React.useEffect(() => {
    if (selectedBoard) {
      return;
    }
    miroBoardsPicker.open({
      clientId: '3458764530513120042',
      action: 'select',
      iframeContainer: 'boardsPickerContainer',
      success: (result: any) => {
        document.getElementById('boardsPickerContainer')!.innerHTML = '';
        setSelectedBoard(result);
      }
    });
  }, [selectedBoard]);

  const openBoardInNewTab = () => {
    window.open(selectedBoard!.viewLink, "_blank");
  };

  const addBoardEmbed = async () => {
    const embed = await miro.board.createEmbed({
      url: selectedBoard!.viewLink,
      mode: 'modal',
    });
    await miro.board.viewport.zoomTo(embed);
  };

  const cancelSelect = () => {
    setSelectedBoard(undefined);
  };

  const BoardsPickerApp = () => (
    <div id="boardsPickerContainer" />
  );

  const BoardActionsApp = () => (
    <div id="boardActionsApp">
      <h2 className="h2">
        What would you like to do with board <b>"{selectedBoard?.name}"</b>?
      </h2>

      <br />

      <button className="button button-primary" onClick={openBoardInNewTab}>
        <span className="icon-eye"></span>
        Open In New Tab
      </button>
      <button className="button button-primary" onClick={addBoardEmbed}>
        Embed On Current Board
      </button>
      <button className="button button-primary" disabled>
        Open In Current Tab
      </button>
      <button className="button button-secondary" onClick={cancelSelect}>
        Back
      </button>
    </div>
  );

  return (
    <div className="wrapper">
      {selectedBoard ?
        <BoardActionsApp />
        :
        <BoardsPickerApp />
      }
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
