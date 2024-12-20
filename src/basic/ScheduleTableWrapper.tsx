import { Button, ButtonGroup, Flex, Heading, Stack } from "@chakra-ui/react";
import ScheduleTable from "./ScheduleTable.tsx";
import ScheduleDndProvider from './provider/ScheduleDndProvider';
import { TableScheduleProvider } from './provider/TableScheduleProvider';
// import { useTableSchedule } from "./context/ScheduleContext";
import { useSchedule } from './hooks/useSchedule'; 

interface Props {
  tableId: string;
  index: number;
  onDuplicate: () => void;
  onRemove: () => void;
  canRemove: boolean;
  onSearchDialogOpen: (info?: { day?: string; time?: number }) => void;
}


const TableContent = ({ 
  tableId, 
  index,
  onDuplicate, 
  onRemove, 
  canRemove,
  onSearchDialogOpen

}: Props) => {
  const { schedules, updateSchedules } = useSchedule(tableId);

  return (
    <ScheduleDndProvider tableId={tableId}>
      <Stack width="600px">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading as="h3" fontSize="lg">시간표 {index + 1}</Heading>
          <ButtonGroup size="sm" isAttached>
            <Button colorScheme="green" onClick={() => onSearchDialogOpen()}>
              시간표 추가
            </Button>
            <Button colorScheme="green" mx="1px" onClick={onDuplicate}>
              복제
            </Button>
            <Button 
              colorScheme="green" 
              isDisabled={!canRemove}
              onClick={onRemove}
            >
              삭제
            </Button>
          </ButtonGroup>
        </Flex>

       <ScheduleTable
          tableId={tableId}
          onScheduleTimeClick={(timeInfo) => onSearchDialogOpen(timeInfo)}
          onDeleteButtonClick={({ day, time }) => {
            const newSchedules = schedules.filter(
              schedule => schedule.day !== day || !schedule.range.includes(time)
            );
            updateSchedules(newSchedules);
          }}
        />
        
      </Stack>
    </ScheduleDndProvider>
  );
};

export const ScheduleTableWrapper = (props: Props) => {
  return (
    <TableScheduleProvider tableId={props.tableId}>
      <TableContent {...props} />
    </TableScheduleProvider>
  );
};