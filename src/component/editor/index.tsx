import React, {useEffect, useRef, useState} from 'react';
import s from './index.module.scss';
import Input from '@/component/input';
import {Collapse, DatePicker, Select, Input as InputAntd} from 'antd';
import {ITodoItem} from '~/@types/todolist';
import {EditorConfig} from '~/@types/common';
import {useInitGroups} from '@/hooks/todolist';
import {failTip} from '@/util';

const {Panel} = Collapse;
const {Option} = Select;
const {TextArea} = InputAntd;
const levels = [
  {value: '高', color: '#f56c6c'},
  {value: '中', color: '#e6a23c'},
  {value: '低', color: '#67c23a'},
  {value: '无', color: '#909399'},
];

export default function ({callback, initObj, clear, showDetail}: EditorConfig) {
  // 创建代办事项所需的数据
  const nameInput = useRef('');
  const [name, setName] = useState('');
  const [createDate, setCreateDate] = useState(new Date());
  const [ddl, setDdl] = useState(new Date());
  const [level, setLevel] = useState('无');
  const [group, setGroup] = useState('');
  const [description, setDescription] = useState('');
  useEffect(() => {
    if (initObj) {
      setName(initObj.name);
      nameInput.current = initObj.name;
      setCreateDate(initObj.createDate);
      setDdl(initObj.ddl);
      setLevel(initObj.level);
      setGroup(initObj.group);
      setDescription(initObj.description);
    }
  }, [initObj?.id]);

  // 初始化任务分组
  const groupList = useInitGroups();

  // 提交代办事项的回调函数
  const handleAddItem = async () => {
    const obj: ITodoItem = Object.assign({}, initObj, {
      name: nameInput.current,
      createDate,
      ddl,
      level,
      group,
      description,
      done: false,
    });
    try {
      await callback(obj);
      if (clear) {
        setDdl(new Date());
        setLevel('');
        setGroup('');
        setDescription('');
      }
    } catch (e) {
      failTip('Error：' + e);
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
        defaultContent={name}
        clear={clear}
      />
      <Collapse className={s.info} defaultActiveKey={showDetail ? '1' : ''}>
        <Panel header="更多信息（可选）" key="1">
          <div className={s.itemLine}>
            <div>截止日期:</div>
            <DatePicker onChange={(e: any) => setDdl(e._d)} />
          </div>
          <div className={s.itemLine}>
            <div>重要程度:</div>
            <Select onChange={value => setLevel(value)} value={level}>
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
              {groupList.map(item => (
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
