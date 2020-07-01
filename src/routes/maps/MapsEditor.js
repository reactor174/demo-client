import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import L from 'leaflet';

import MapDrawer from './MapDrawer';
import MapViewer from './MapViewer';

import NoticeModal from './../../components/NoticeModal';

function MapsEditor() {

    const [ mode, setMode ] = useState('view');
    const setModeToView = () => setMode('view');
    const setModeToEdit = () => setMode('edit');

    const [ noticeShow, setNoticeShow ] = useState(false);
    const [ noNoticeShowAgain, setNoNoticeShowAgain ] = useState(true);

    const editBtnClick = () => {
        if (!noNoticeShowAgain) setNoticeShow(true);
        setModeToEdit();
    }

    const noticeModalClose = doNotShowAgain => {
        if (doNotShowAgain) setNoNoticeShowAgain(true);
        setNoticeShow(false);
    }

    const [ center, setCenter ] = useState( [ 55.76, 37.57 ] );
    const [ zoom, setZoom ] = useState( 10 );

    const geoJSON = new L.GeoJSON({
        "type": "FeatureCollection",
        "features": []
    });
    
    const [ mapObjects, setMapObjects ] = useState(geoJSON);
    
    const changeCenter = center => setCenter(center);
    const changeZoom = zoom => setZoom(zoom);

    const changeMapObjects = changedMapObjects => {
        setMapObjects(new L.GeoJSON(changedMapObjects));
    }
    
    return (
        <>
        <Container>
            <Row className={ "py-2" + ( mode !== 'view' ? ' d-none' : '' ) }>
                <Col md={ 12 } className="text-right">
                    <Button variant="primary" onClick={ editBtnClick }>Редактировать карту</Button>
                </Col>
            </Row>
            <Row  className={ "py-2" + ( mode !== 'edit' ? ' d-none' : '' ) }>
                <Col md={ 12 } className="text-right">
                    <Button variant="success" onClick={ setModeToView }>Завершить редактирование</Button>
                </Col>
            </Row>
        </Container>

        <NoticeModal 
            title="Добавление точки на карту"
            text={ 
            "Для добавления точки нажмите на карту в том месте, где Вам хочется, чтобы она появилась. "
            + "Добавленную точку можно перенести с помощью мыши. "
            + "Кликните на добавленную точку, чтобы отредактировать её параметры."
            }
            visibility={ noticeShow } 
            onClose={ doNotShowAgain => noticeModalClose(doNotShowAgain) }
        />

        {
            mode === 'view'
            ?
            <MapViewer 
                center={ center } 
                zoom={ zoom }
                onChangeCenter={ changeCenter }
                onChangeZoom={ changeZoom }
                mapObjects={ mapObjects }
            />
            :
            <MapDrawer
                center={ center }
                onChangeCenter={ changeCenter }
                zoom={ zoom }
                onChangeZoom={ changeZoom }
                mapObjects={ mapObjects }
                onChangeMapObjects={ changeMapObjects }
            />
        }
    </>
  );
}

export default MapsEditor;
