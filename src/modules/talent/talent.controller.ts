import { Controller, Param, Delete } from '@nestjs/common';
import { ResponseDto } from '../../utils/ResponseDto';
import { DeleteResponse } from '../../utils/DeleteResponse';
import { ShiftService } from '../shift/shift.service';

@Controller('talent')
export class TalentController {
  constructor(private readonly shiftService: ShiftService) {}

  @Delete(':id')
  async cancelShiftsByTalentId(
    @Param('id') id: string,
  ): Promise<ResponseDto<DeleteResponse>> {
    await this.shiftService.cancelShiftsByTalentId(id);
    return new ResponseDto<DeleteResponse>(new DeleteResponse(id));
  }
}
