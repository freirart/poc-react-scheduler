import { Button, Popover, Select, TimePicker } from "antd";

import { PopupInterface } from "../..";

export default function CreatePopup({
  open,
  handleClose,
  children,
  event,
  createEvent,
}: PopupInterface) {
  const handleCreate = () => {
    const { start, end } = event;

    if (start && end) {
      createEvent(start, end);
    }
  };

  return (
    <Popover
      open={open}
      title="Create Popup"
      content={
        <div>
          <p>Selecione o tipo de horário especial: </p>
          <div>
            <Select placeholder="Problema Pessoal, Problema de Infra...">
              <Select.Option value="foo">foo</Select.Option>
              <Select.Option value="bar">bar</Select.Option>
            </Select>
          </div>
          <p className="mt-2">Confira a duração de "Problema Pessoal":</p>
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
            <Select placeholder={`Justifique o porquê de "Problema Pessoal":`}>
              <Select.Option value="foo">foo</Select.Option>
              <Select.Option value="bar">bar</Select.Option>
            </Select>
          </div>

          <div className="flex mt-2 justify-end">
            <Button type="primary" onClick={handleCreate}>
              Salvar
            </Button>
          </div>
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
