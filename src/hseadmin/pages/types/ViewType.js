import React, {useEffect} from 'react';
import {NavLink, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {renderTitleAndContent} from '../../constants/CustomFunction';
import {Button} from 'react-bootstrap';
import {getType} from '../../store/actions/types';

const ViewType = () => {
  const dispatch = useDispatch();

  const type = useSelector((state) => state.type.type);

  const {id} = useParams();

  useEffect(() => {
    // console.log('param is ' + params.id);
    loadType();
  }, []);

  const loadType = async () => {
    await dispatch(getType(id));
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-text-width" />
                &nbsp; Types Details
              </h3>
              <NavLink to="/types">
                <Button
                  className="btn-sm"
                  variant="primary"
                  type="button"
                  style={{float: 'right'}}
                >
                  Back
                </Button>
              </NavLink>
            </div>

            <div className="card-body">
              <dl className="row">
                {renderTitleAndContent(
                  'Name: ',
                  type !== null ? type.name : ''
                )}
                {renderTitleAndContent(
                  'Short Desc: ',
                  type !== null ? type.short_desc : ''
                )}
                {renderTitleAndContent(
                  'Description: ',
                  type !== null ? type.long_desc : ''
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewType;
