import React, { PureComponent } from "react";
import "../../../css/UploadPicStyle.css";

/**
 * This class allows users to upload photos or files.
 */
class UploadPic  extends PureComponent {  
    
    render() { 
        return ( 
          <div className="upload-file-container"> 
            <div className="upload-pic-flex">
              <form className="UploadPicForm" >
                   <input name="image" type="file" id="image-file-upload"  multiple  onChange={this.props.handleChange}/>
                   <input name="name" type="text"  id="image-title" placeholder="File Name:"  onChange={this.props.handleChange}/>
                   <textarea name="comments" placeholder="Add Comments" rows="15" cols="150"  onChange={this.props.handleChange} ></textarea>
                   <div className="button-flex ">
                      <button className="btn btn-success center" type="submit"  onClick={this.props.handleSubmit}> Upload File</button> 
                   </div>
               </form>
            </div>
         </div>
         );
    };
};

export default UploadPic;