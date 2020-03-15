import React, { PureComponent } from "react";
import ImageMapper from 'react-image-mapper';
import Datasheets from "./Datasheets";
import {Link , withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import "../../css/millImage.css";

/**
 * This is the component for the mill, for now default sag mill. 
 * Use image mapper to highlight the equipment parts on hover.
 * Key things: If the part's datasheet is completed, image will highlight green.
 * 
 * If use filled in fixed main bearing, the free main bearing is blocked and vice versa.
 * Later 3D image.
 * 
 * No Redux since the states are local only for this component.
 */

class ImageComponent extends PureComponent {
  constructor(props){
    super(props);
    
    this.state={
    hoveredArea: null,
    msg: null,
    moveMsg: null,
  }
  }

  /**
   * @param {string} area - the area is simply the event, which is the object in areas array.
   */
     clicked = area => {
      const {dispatch} = this.props.action_props;
      const {setPartType} = this.props.action_props.datasheet_action;
      const redirectedPath = '/Datasheets';
      dispatch(setPartType(area.name));
       this.props.history.push({
       pathname : this.props.isService === true ? redirectedPath : `/Client${redirectedPath}`,
       report_id: this.props.report_id ,
       action_props:this.props.action_props
     });
       
     };

    // Not used to be removed 

    //  clickedOutside= (evt) => {
    //   const coords = {x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
    //   this.setState({ msg: `You clicked on the image at coords ${JSON.stringify(coords)} !` });
    // }

    //  moveOnImage = (evt) =>{
    //    const coords = {x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
    //    const message = `You moved on the image at coords ${JSON.stringify(coords)} !`;
    //    this.setState({ moveMsg: message });
    //   }
     enterArea = (area) => {
      const {dispatch} = this.props.action_props;
      const {changeHeaderTitle} = this.props.action_props.global_action;
     
      dispatch(changeHeaderTitle(`${area.name}`));
      const message = `You entered  ${area.name} at coords ${JSON.stringify(area.coords)} !`;
      this.setState({ hoveredArea: area, msg: message});
     }
    //  leaveArea = (area) => {
    //   const message = `You left ${area.name} at coords ${JSON.stringify(area.coords)} !`;
    //   this.setState({ hoveredArea: null, msg: message  });
    //  }
    //  moveOnArea = (area, evt) => {
    //   const coords = {x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
    //   const message = `You moved on ${area.shape} ${area.name} at coords ${JSON.stringify(coords)} !`;
    //   this.setState({ moveMsg: message });
    //  }

    //  getTipPosition = (area) => {
    //    return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
    //  }

render = () => {

  const transparent_green = 'rgba(98,247,17,0.67)';
  const transparent_red = 'rgba(247,17,17,0.5)';

  const MAP = {
     
  name: 'sag-mill',
  areas: [
    {name: 'Feed arrangement', shape: 'poly', coords: [119,107, 119,97, 62,87, 42,105, 40,146, 28,145, 5,165, 6,201, 9,211, 72,221, 80,209, 91,197, 94,201,
      100,184, 100,154, 101,137, 110,137, 110,117, 119,109], fillColor: 'd42e16'},
    {name: 'Free main bearing', shape: 'poly', coords: [128,110, 120,108, 112,113, 105,126, 102,141, 100,153, 100,168, 102,184, 105, 188, 107,190, 117,211, 118,176, 121,149, 
        125,128, 129,110], preFillColor: (this.props.part_type === 'Fixed main bearing') ? transparent_red :  (this.props.part_type === 'Free main bearing') && transparent_green ,fillColor: 'd42e16'},
    {name: 'Shell & heads', shape: 'poly', coords: [272,35, 207, 28,  199,21, 190,19, 178,20, 162,34, 150,52, 140,70, 129,99, 123, 136, 118,171, 119,198, 121,232, 
          126,254, 137,275, 149,290, 158,293, 172,289, 195,293, 194,283, 204,284 , 221,265, 224,230, 227,192, 233,157, 240,124, 251, 92,  262,57], fillColor: 'd42e16'},
    {name: 'Gear & gear guard', shape: 'poly', coords: [ 223,265,  229,270, 249,272, 253,272, 253, 260, 255,256, 221,265 ,243,101, 273,33, 307,5, 330,7,  360,24, 378,80, 390,132,
       373,131, 371,132,  365, 139, 358, 137, 357,105, 350, 69, 330,43,  306,44,  333,25, 300,48, 271,105, 257, 213, 258,253 , 223,265], fillColor: 'd42e16'},
    {name: 'Fixed main bearing', shape: 'poly', coords: [335,225, 338,240, 319,239, 324,227, 326,215, 319,202, 318,183, 319,188, 324,153, 332,140,338,135, 359,137,
        365,141, 352,159,348,177, 348,198, 352,211, 357,223], preFillColor: (this.props.part_type === 'Free main bearing') ? transparent_red :(this.props.part_type === 'Fixed main bearing') && transparent_green ,fillColor: 'd42e16'},
    {name: 'Discharge arrangement', shape: 'poly', coords: [  382,221, 375,230, 362,230, 354,217, 351,201, 352,182, 355,166, 358,152,366,141, 371,133, 407,137,409,138,413,138,417,138,420,138,
     421,139,422,139, 423,139,424,139,427,139,479,145, 483,152, 488, 172,  488,185, 485,203, 480,221, 475,233, 386,224], fillColor: 'd42e16'},
    {name: 'Drivetrain', shape: 'poly', coords: [185,248, 210,250, 215,246, 223,246, 222,266, 251,270, 254,258, 263,251, 275,254, 279,258, 280,258, 284,253, 317,259, 321,257, 
    340,240, 359,243, 360,244, 361,263, 364,262, 365,241, 386,223, 480,235, 481,267, 505,269, 505,307, 495,317, 469,312, 465,316, 435,312, 434,324, 364,315, 
    345,312, 344,316, 314,313, 315,289, 310,289, 301,286, 296,280, 290,286, 278,284, 266,296, 257,295, 256,287, 250,274, 227,271, 219,276, 203,275,205,270, 
  196,269, 194,260, 183,258,  183,250, 184,251  ], preFillColor: (this.props.part_type === 'Drivetrain') && transparent_green , fillColor:  'd42e16'},
    {name: 'Foundation & Jacking-Cradle', shape: 'poly', coords: [495,317, 469,312, 465,316, 435,312, 434,324, 364,315, 
      345,312, 344,316, 314,313, 315,289, 310,289, 301,286, 296,280, 290,286, 278,284, 266,296, 257,295, 256,287, 250,274, 227,271, 219,276, 203,275, 195,286, 194,293,
    170,292, 160,293, 151,292, 141,287, 135, 279,  128,270, 123,253, 120,238, 117,220, 100,210, 87,224, 86,336, 86,341, 176,373, 188,364, 187,345, 
  142,339,168,317, 194,321, 196,417, 249,423, 250,437, 482, 466, 515,440, 511,315], fillColor: 'd42e16'},
  ]
};

  let imagePath = (this.props.isService === true) ? '../photos/mill.png' : '../../photos/mill.png' ;

  return (
      <div className='grid'>
        <div className="presenter">
          <div style={{ position: 'relative' }}>

        {/* props of the equipment id should be passed once we have list of parts */}
        <Link to={{component : <Datasheets/>}}> 
            <ImageMapper src={imagePath} map={MAP} width={530}
              height={470}
            
              onClick={ area => this.clicked(area) }
              onMouseEnter={area => this.enterArea(area)}
              // onMouseLeave={area => this.leaveArea(area)}
              // onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}
              // onImageClick={evt => this.clickedOutside(evt)}
              // onImageMouseMove={evt => this.moveOnImage(evt)}
            />
        </Link>

            {/* {
              this.state.hoveredArea &&
              <span className="tooltip" style={{ ...this.getTipPosition(this.state.hoveredArea)}}>
                { this.state.hoveredArea && this.state.hoveredArea.name}
              </span>
            } */}
          </div>
        </div>
      </div>
    );
 };
};

const mapStateToProps = state => {
  console.log("image report states are: ", state);
  
   const {equipment_clientReducer, globalReducer, reportReducer,dataSheetReducer } = state
    
   return {
    equipment_clientReducer,
    isService : globalReducer.isServiceWorker,
    client_name : equipment_clientReducer.current_customer.name,
    equipment_serial_number: equipment_clientReducer.equipment_serial_number,
    report_id: reportReducer.report_id,
    part_type: dataSheetReducer.part_type
    };
  };
 
export default withRouter(connect(mapStateToProps)(ImageComponent));
