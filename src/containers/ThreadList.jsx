import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Loading from '../components/Loading'
import Threads from '../components/Threads'
import { endFetch, fetchThreads, setErr } from '../actions'
import { getThreads } from '../reducers'
import { setDocTitle } from '../util'

export class ThreadList extends Component {
  componentDidMount() {
    setDocTitle()
    if(this.props.fetchThreads) {
      this.props.fetchThreads()
        .catch(err => {
          if(!this.props.threads || (Array.isArray(this.props.threads) && this.props.threads.length === 0)) {
            if(this.props.setErr) {
              this.props.setErr('read', err)
            }
          } else {
            if(this.props.endFetch) {
              this.props.endFetch()
            }
          }
        })
    }
  }

  render() {
    if(this.props.isFetching && Array.isArray(this.props.threads) && this.props.threads.length === 0) {
      return <Loading />
    }

    if(Array.isArray(this.props.threads) && this.props.threads.length === 0) {
      return <div className="center">No threads found. Be the first to post one by clicking on &quot;Start a New Thread&quot; above!</div>
    }
    return <Threads threads={this.props.threads} />
  }
}

ThreadList.propTypes = {
  endFetch: PropTypes.func,
  fetchThreads: PropTypes.func,
  isFetching: PropTypes.bool.isRequired,
  setErr: PropTypes.func,
  threads: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    subject: PropTypes.string,
    comment: PropTypes.string.isRequired,
    replies: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired
    }))
  })).isRequired
}

const mapStateToProps = state => ({
  isFetching: state.isFetching,
  threads: getThreads(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  endFetch,
  fetchThreads,
  setErr
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ThreadList)
