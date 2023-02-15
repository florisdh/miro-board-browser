import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { sendMetricBoardEmbedded, sendMetricBoardOpenedNewTab, sendMetricBoardOpenedPopup, sendMetricBoardPicked } from './firebase';

const App: React.FC = () => {

  const [selectedBoard, setSelectedBoard] = React.useState<BoardPickerSelectResult>();

  React.useEffect(() => {
    if (selectedBoard) {
      return;
    }
    miroBoardsPicker.open({
      clientId: '3458764546007773933',
      action: 'select',
      iframeContainer: 'boardsPickerContainer',
      success: (result: any) => {
        document.getElementById('boardsPickerContainer')!.innerHTML = '';
        setSelectedBoard(result);
        sendMetricBoardPicked();
      }
    });
  }, [selectedBoard]);

  const openBoardInNewTab = () => {
    window.open(selectedBoard!.viewLink, "_blank");
    sendMetricBoardOpenedNewTab();
  };

  const openBoardInPopup = async () => {
    await miro.board.ui.openModal({
      url: selectedBoard!.viewLink
    });
    sendMetricBoardOpenedPopup();
  };

  const addBoardEmbed = async () => {
    const embed = await miro.board.createEmbed({
      url: selectedBoard!.viewLink,
      mode: 'modal',
    });
    await miro.board.viewport.zoomTo(embed);
    sendMetricBoardEmbedded();
  };

  const cancelSelect = () => {
    setSelectedBoard(undefined);
  };

  const openFeedbackForm = () => {
    window.open('https://forms.gle/S2JgrwE4N6sfT8VX9', "_blank");
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
      <button className="button button-primary" onClick={openBoardInPopup}>
        Open In Popup
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
      <button className="feedback-button button button-tertiary" onClick={openFeedbackForm}>
        <span className="icon-comment-feedback"></span>
      </button>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
