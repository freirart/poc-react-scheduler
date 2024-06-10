import { Button, Popover, Select, TimePicker } from "antd";

import { PopupInterface } from "../..";
import { useState } from "react";

export default function EditPopup({
  open,
  handleClose,
  children,
  event,
  removeEvent,
}: PopupInterface) {
  const [editing, setEditing] = useState(false);

  const handleRemove = () => {
    const { id } = event;

    if (id) {
      removeEvent(id);
      handleClose();
    }
  };

  return (
    <Popover
      open={open}
      title="Edit Popup"
      content={
        <div>
          {editing ? (
            <>
              <p>Selecione o tipo de horário especial: </p>
              <div>
                <Select placeholder="Problema Pessoal, Problema de Infra...">
                  <Select.Option value="foo">foo</Select.Option>
                  <Select.Option value="bar">bar</Select.Option>
                </Select>
              </div>
              <p className="mt-2">
                Confira a duração de &quot;Problema Pessoal&quot;:
              </p>
              <div className="flex">
                <div>
                  <TimePicker placeholder="Início" />
                </div>
                <div className="ml-2">
                  <TimePicker placeholder="Fim" />
                </div>
              </div>
              <p className="mt-2">Razão: </p>
              <div>
                <Select
                  placeholder={`Justifique o porquê de "Problema Pessoal":`}
                >
                  <Select.Option value="foo">foo</Select.Option>
                  <Select.Option value="bar">bar</Select.Option>
                </Select>
              </div>
            </>
          ) : (
            <div>
              <p>Informações sobre o hesp...</p>
              <pre>
                <code>{JSON.stringify(event, null, 2)}</code>
              </pre>
            </div>
          )}
          {editing ? (
            <div className="flex justify-end mt-2">
              <Button type="primary" onClick={handleClose}>
                Atualizar
              </Button>
            </div>
          ) : (
            <div>
              <Button onClick={() => setEditing(true)}>Editar</Button>

              <Button onClick={handleRemove}>Remover</Button>
            </div>
          )}
        </div>
      }
      onOpenChange={handleClose}
      placement="right"
      trigger="click"
    >
      {children}
    </Popover>
  );
}
