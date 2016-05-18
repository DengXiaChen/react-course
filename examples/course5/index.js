import 'babel-polyfill'
import React from 'react'
import ReactDOM,{ render } from 'react-dom'

var TestClickComponents = React.createClass({
    handleClick: function(event) {
        var tipE = this.refs.tip;
        if(tipE.style.display == "none"){
            tipE.style.display = "inline";
        }else{
            tipE.style.display = "none";
        }
        event.preventDefault();
        event.stopPropagation();
    },
    render: function() {
        return (
            <div>
                <button onClick={this.handleClick}>显示|隐藏</button>
                <span ref="tip">测试内容</span>
            </div>
        )
    },
});

var Child = React.createClass({
    render: function(){
        return(
            <div>123</div>
        )
    }
})

var FocusComponent = React.createClass({
    getInitialState: function() {
      return {userInput: ''};
    },
    handleChange: function(e) {
      this.setState({userInput: e.target.value});
    },
    clearAndFocusInput: function() {
        this.setState({userInput: ''});
        this.refs.theInput.focus();
        console.log(ReactDOM.findDOMNode(this.refs.ch) === this.refs.ch);
        console.log(ReactDOM.findDOMNode(this.refs.fa) === this.refs.fa);
    },
    render: function() {
      return (
        <div ref='fa'>
          <div onClick={this.clearAndFocusInput}>
            Click to Focus and Reset
          </div>
          <input
            ref="theInput"
            value={this.state.userInput}
            onChange={this.handleChange}
          />
          <Child ref='ch'></Child>
        </div>
      );
    }
});

var LikeButton1 = React.createClass({
    getInitialState: function() {
        return {
            liked: false
        };
    },
    handleClick: function(event) {
        this.setState({liked: !this.state.liked});
        console.log(event);
    },
    render: function() {
        var text = this.state.liked ? '喜欢' : '不喜欢';
        return (
            <div>
                <p onClick={this.handleClick}>
                    你<strong>{text}</strong>这个，点击更改。
                </p>
            </div>
        );
    }
});

class LikeButton2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {liked: false};
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    this.setState({ liked: !this.state.liked });
    console.log(e);
  }
  render() {
    const text = this.state.liked ? '喜欢' : '不喜欢';
    return (
        <div>
            <p onClick={this.handleClick}>
                你<strong>{text}</strong>这个，点击更改。
            </p>
        </div>
    );
  }
}

class LikeButton3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {liked: false};
  }
  handleClick(event,str) {
    this.setState({ liked: !this.state.liked });
    console.log(event);
    console.log(str);
  }
  render() {
    const text = this.state.liked ? '喜欢' : '不喜欢';
    return (
        <div>
            <p onClick={(event) => this.handleClick(event,'test')}>
                你<strong>{text}</strong>这个，点击更改。
            </p>
        </div>
    );
  }
}

var TestInputComponents = React.createClass({
    getInitialState: function() {
        return {
            inputContent: ''
        };
    },
    handleChange: function(event) {
        this.setState({
            inputContent: event.target.value,
        })
        console.log(event.target);
    },
    render: function() {
        return (
            <div>
                <input onChange={this.handleChange} type="text"/>
                <span>{this.state.inputContent}</span>
            </div>
        )
    },
});

ReactDOM.render(
    <div>
        <TestClickComponents />
        <br/><br/><br/><br/>
        <FocusComponent />
        <br/><br/><br/><br/>
        <LikeButton1 />
        <LikeButton2 />
        <LikeButton3 />
        <br/><br/><br/><br/>
        <TestInputComponents />
    </div>,
    document.getElementById('root')
)