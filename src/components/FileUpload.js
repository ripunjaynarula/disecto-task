import axios from 'axios';

import React, { Component } from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
} from '@chakra-ui/react';

class FileUpload extends Component {
  state = {
    // Initially, no file is selected
    selectedFile: null,
  };

  // On file select (from the pop up)
  onFileChange = event => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  // On file upload (click the upload button)
  onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      'myFile',
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    // Details of the uploaded file
    console.log(this.state.selectedFile);

    // Request made to the backend api
    // Send formData object
    axios.post('api/uploadfile', formData);
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>

          <p>File Name: {this.state.selectedFile.name}</p>


          <p>
            Last Modified:{' '}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        &nbsp;
        <div>
          <FormControl enctype="multipart/form-data">
            <input type="file"  onChange={this.onFileChange} /><br/>
            <FormHelperText>
              {' '}
              Choose before Pressing the Upload button
            </FormHelperText><br/>
            <Button onClick={this.onFileUpload}>Create New Collection</Button>
          </FormControl>
        </div>
        {this.fileData()}
      </div>
    );
  }
}

export default FileUpload;
