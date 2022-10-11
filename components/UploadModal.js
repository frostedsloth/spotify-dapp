import React from "react";
import styles from '../styles/UploadModal.module.css'

const UploadModal=({
    description: title,
    musicUrl,
    newMusic,
    setTitle,
    setMusicUrl,
    setShowUploadMusic,
  }) =>
{

    const toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })

  const uploadClicked = async () => {
    var files = document.querySelector('#music-file')

    if (files.files.length == 0) return

    const base64_file = await toBase64(files.files[0])

    axios
      .post(
        '/api/upload_music',
        { file: base64_file, filename: files.files[0].name },
        {},
      )
      .then(res => {
        console.log(res.data)
        if (
          res.data.result &&
          res.data.result.created &&
          res.data.result.created[0].dataTxId
        )
          setMusicUrl(
            'https://arweave.net/' + res.data.result.created[0].dataTxId,
          )
      })
      .catch(err => {
        console.log(err)
      })
  }

  const createNewClicked = () => {
    newMusic()
  }
    return(
        <div className={styles.wrapper}>
        <div className={styles.title}>Upload New Music</div>
        <input type='file' id='music-file' name='file' />
        <div className={styles.modalButtons}>
          <button
            onClick={uploadClicked}
            className={`${styles.button} ${styles.createButton}`}
          >
            Upload
          </button>
        </div>
  
        <div className={styles.inputField}>
          <div className={styles.inputTitle}>Title</div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              type='text'
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.inputField}>
          <div className={styles.inputTitle}>Music Url</div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              type='text'
              value={musicUrl}
              onChange={e => setMusicUrl(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.modalButtons}>
          <button
            onClick={() => setShowUploadMusic(false)}
            className={`${styles.button} ${styles.cancelButton}`}
          >
            Cancel
          </button>
          <button
            onClick={createNewClicked}
            className={`${styles.button} ${styles.createButton}`}
          >
            Create New
          </button>
        </div>
      </div>
    )
}

export default UploadModal