import React from 'react';
import { render } from 'react-dom';
import RepLogApp from './RepLog/RepLogApp';

const shouldShowHeart = false;

render(
    <RepLogApp
        withHeart={shouldShowHeart}
        // itemOptions={window.REP_LOG_APP_PROPS.itemOptions}
        {...window.REP_LOG_APP_PROPS}
    />,
    document.getElementById('lift-stuff-app')
);

// render(
//     <div>
//         <RepLogApp withHeart={true}/>
//         <RepLogApp withHeart={false}/>
//     </div>,
//     document.getElementById('lift-stuff-app')
// );

// const el = React.createElement(
//     'h2',
//     null,
//     'Lift History!',
//     React.createElement('span', null, '❤')
// );

//const el = <h2>Lift Stuff! <span>❤️</span></h2>;

// class RepLogApp extends React.Component {
//     render() {
//         return <h2>Lift Stuff! <span>❤️</span></h2>;
//     }
// }

// class RepLogApp extends Component {
//     render() {
//         return <h2>Lift Stuff! <span>❤️</span></h2>;
//     }
// }

//ReactDom.render(el, document.getElementById('lift-stuff-app'));

// render(<RepLogApp/>, document.getElementById('lift-stuff-app'));