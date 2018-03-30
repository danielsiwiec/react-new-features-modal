import React, {Component} from 'react'

import Modal from './Modal'
import styles from '../styles/new-features.css'

export default class NewFeatures extends Component {

  constructor(props) {
    super(props)
    this.state = {showModal: false}
  }

  render() {
    return (
      <Modal show={this.state.showModal}>
        <h3 className={styles.title}>New features!</h3>
        <div className={styles.body}>
          <p className={styles.subtitle}>We implemented some new features for you:</p>
          <ul className={styles.list}>
            {this.getNewFeatures(this.getUsersVersion(), this.props.limit).map((feature, index) => {
              return <li key={index} className={styles.item}><strong>{feature.title}</strong> {feature.description}</li>
            })}
          </ul>
          <button className={styles.button} onClick={this.closeModal.bind(this)}>Got it!</button>
        </div>
      </Modal>
    )
  }

  closeModal() {
    this.setState({showModal: false})
    this.updateUserVersion()
  }

  getUsersVersion(){
    return localStorage.getItem(this.props.storageKey) || 0
  }

  updateUserVersion(){
    localStorage.setItem(this.props.storageKey, this.currentVersion())
  }

  currentVersion() {
    return this.props.notes.releases
      .reduce((acc, release) => {return acc > release.version ? acc : release.version}, 0)
  }

  componentDidMount() {
    let show = this.getUsersVersion() < this.currentVersion()
    setTimeout(()=> {this.setState({showModal: show})}, 1000)
  }

  getNewFeatures(version, limit) {
    return this.props.notes.releases
      .filter((release) => {return release.version > version})
      .sort((one, two) => {return one.version - two.version})
      .slice(-1*limit)
      .reduce((acc, release) => {return acc.concat(release.features)}, [])
  }

}