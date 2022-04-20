import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/@types/store';
import s from '../index.module.scss';
import {Table, Button, Modal} from 'antd';
import {deleteEventAction, toogleEventDoneAction} from '@/redux/timing/actions';
const {confirm} = Modal;
export default function () {
  const list = useSelector((state: RootState) =>
    state.timing.eventList.filter(item => item.isDone)
  );
  const dispatch = useDispatch();
  const columns = [
    {title: '事件名', dataIndex: 'name'},
    {
      title: '操作',
      dataIndex: 'name',
      render(name: string) {
        const handleDelete = () => {
          confirm({
            title: '确认要删除吗',
            icon: null,
            onOk() {
              dispatch(deleteEventAction(name));
            },
          });
        };
        const hadnleToogle = () => {
          confirm({
            title: '确认要恢复吗',
            icon: null,
            onOk() {
              dispatch(toogleEventDoneAction(name));
            },
          });
        };
        return (
          <>
            <Button style={{marginRight: 20}} onClick={hadnleToogle}>
              恢复
            </Button>
            <Button onClick={handleDelete}>删除</Button>
          </>
        );
      },
    },
  ];
  return (
    <div className={s.doneList}>
      <Table columns={columns} dataSource={list} />
    </div>
  );
}
