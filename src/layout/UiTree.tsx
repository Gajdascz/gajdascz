import { Logo } from 'shared/components';
export interface TreeNode {
  id: string;
  label: string | React.ReactNode;
  type: string;
  children?: TreeNode[];
  state?: 'idle' | 'hovered' | 'active';
}
export function UiTree(rootNode: TreeNode) {
  const renderNode = (node: TreeNode): React.ReactNode => {
    return (
      <div key={node.id} className={`tree-node ${node.state ?? 'idle'}`}>
        <div className='node-label'>{node.label}</div>
        {node.children && node.children.length > 0 && (
          <div className='node-children'>{node.children.map(renderNode)}</div>
        )}
      </div>
    );
  };

  return (
    <div className='ui-tree'>
      <div className='tree-root'>
        {renderNode({ ...rootNode, label: <Logo /> })}
      </div>
    </div>
  );
}
