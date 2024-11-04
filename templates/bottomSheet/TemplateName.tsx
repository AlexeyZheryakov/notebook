import { memo, useCallback } from 'react';
import { Button, Typography } from 'front-package-ui-kit';
import s from './styles.module.scss';

export const TEST_ID = 'TemplateName';

export const openTemplateName = 'openTemplateName';

export interface TemplateNameProps {
  onChange?: () => void;
  onApplyClick?: () => void;
}

const TemplateName = ({ onApplyClick }: TemplateNameProps) => {
  const { onCloseBottomSheet, getIsOpenBottomSheet } = useBottomSheet();

  const isOpen = getIsOpenBottomSheet(openTemplateName);

  const handleClose = useCallback(() => onCloseBottomSheet(), [onCloseBottomSheet]);
  return (
    <BottomSheetUI
      data-testid={TEST_ID}
      expandOnContentDrag
      open={isOpen}
      touchLine
      height="auto"
      onDismiss={handleClose}
      header={<BottomSheetHeader onClose={handleClose} />}
      footer={
        <BottomButtonBlock>
          <Button size="L" color="black" onClick={onApplyClick} variant="contained" fullWidth>
            <Typography variant="text6" fontWeight={700} color="white">
              Применить
            </Typography>
          </Button>
        </BottomButtonBlock>
      }
    >
      <div className={s.templateName}>TemplateName</div>
    </BottomSheetUI>
  );
};

export const TemplateNameMemo = memo(TemplateName);
