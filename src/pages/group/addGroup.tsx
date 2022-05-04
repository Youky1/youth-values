import React, {useState} from 'react';
import {failTip, successTip} from '@/util';
import {addGroup} from '@/api/group';
import AddButton from '~/src/component/addButton';
import {Button, Drawer, Input} from 'antd';

const {TextArea} = Input;

export default function Joined({
  id,
  refreshData,
}: {
  id: string;
  refreshData: Function;
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [newId, setNewId] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const handleAddGroup = async () => {
    if (!newId || !newDescription) {
      failTip('小组名或描述不能为空');
      return;
    }
    try {
      await addGroup({id: newId, description: newDescription, owner: id});
      setIsAdding(false);
      successTip('添加成功');
      await refreshData();
    } catch (e) {
      failTip(e);
    }
  };
  return (
    <>
      {/* 创建小组 */}
      <AddButton overlay="新建小组" callback={() => setIsAdding(true)} />
      <Drawer
        visible={isAdding}
        title="创建小组"
        onClose={() => setIsAdding(false)}
        width={640}
      >
        <div className="lineContainer">
          <span>小组名称</span>
          <Input value={newId} onChange={e => setNewId(e.target.value)} />
        </div>
        <div className="lineContainer" style={{height: 'auto', padding: 20}}>
          <span>小组描述</span>
          <TextArea
            rows={4}
            value={newDescription}
            onChange={e => setNewDescription(e.target.value)}
          ></TextArea>
        </div>
        <Button
          onClick={handleAddGroup}
          size="large"
          type="primary"
          shape="round"
          style={{
            marginTop: 40,
            marginLeft: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          确定添加
        </Button>
      </Drawer>
    </>
  );
}
