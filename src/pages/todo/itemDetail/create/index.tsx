import React, {useEffect, useRef, useState} from 'react';
import s from './index.module.scss';
import Input from '@/component/input';
import {Collapse, DatePicker, Select, Input as InputAntd, message} from 'antd';
import {getGroupList, addTodoItem} from '@/api/todolist';
import {ITodoItem} from '~/@types/todolist';
import {useDispatch} from 'react-redux';
import {addTodoItemAction} from '@/store/todolist/actions';

const {Panel} = Collapse;
const {Option} = Select;
const {TextArea} = InputAntd;
const levels = [
  {value: '高', color: '#f56c6c'},
  {value: '中', color: '#e6a23c'},
  {value: '低', color: '#67c23a'},
  {value: '无', color: '#909399'},
];

export default function () {
  // 创建代办事项所需的数据
  const nameInput = useRef('');
  const [createDate] = useState(new Date());
  const [ddl, setDdl] = useState(new Date());
  const [level, setLevel] = useState('');
  const [group, setGroup] = useState('');
  const [description, setDescription] = useState('');

  // 初始化任务分组
  const [groupArr, setGroupArr] = useState<Array<string>>([]);
  useEffect(() => {
    getGroupList().then(data => {
      setGroupArr(['无', ...(data as Array<string>)]);
    });
  }, []);

  const dispatch = useDispatch();

  // 提交代办事项的回调函数
  const handleAddItem = async () => {
    const obj: ITodoItem = {
      name: nameInput.current,
      createDate,
      ddl,
      level,
      group,
      description,
    };
    try {
      await addTodoItem(obj);
      dispatch(addTodoItemAction(obj));
      message.success('添加代办事项成功');
      setDdl(new Date());
      setLevel('');
      setGroup('');
      setDescription('');
    } catch (e) {
      message.error('添加事件出错，原因：' + e);
    }
  };

  return (
    <div id={s.create}>
      <Input
        icon="icon-tijiao"
        callback={(v: string) => {
          nameInput.current = v;
          handleAddItem();
        }}
        placeholder="回车或点击右侧按钮添加事项"
      />
      <Collapse className={s.info}>
        <Panel header="更多信息（可选）" key="1">
          <div className={s.itemLine}>
            <div>截止日期:</div>
            <DatePicker onChange={(e: any) => setDdl(e._d)} />
          </div>
          <div className={s.itemLine}>
            <div>重要程度:</div>
            <Select onChange={value => setLevel(value)} defaultValue="无">
              {levels.map(l => (
                <Option
                  key={l.color}
                  value={l.value}
                  children={
                    <>
                      <div className={s.option}>
                        <div
                          style={{
                            backgroundColor: l.color,
                          }}
                        ></div>
                        {l.value}
                      </div>
                    </>
                  }
                ></Option>
              ))}
            </Select>
          </div>
          <div className={s.itemLine}>
            <div>所属分组:</div>
            <Select onChange={value => setGroup(value)} defaultValue="无">
              {groupArr.map(item => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </div>
          <div className={s.itemLine} style={{height: 'auto'}}>
            <div>具体描述:</div>
            <TextArea
              rows={6}
              value={description}
              onChange={({target: {value}}) => setDescription(value)}
            ></TextArea>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}
